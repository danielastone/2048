import { createSquareGridGraph } from "./graph.js";
import { mergeRowLeft, canLineMove } from "./engine.js";
import { createBoardHash, createMoveRecord } from "./analytics.js";
import { chooseRandomSpawn, chooseManualSpawn } from "./spawn.js";

const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const newGameButton = document.getElementById("new-game-button");

let score = 0;
let moveNumber = 0;
const moveLog = [];
let spawnMode = "automatic";
let phase = "slide";

const graph = createSquareGridGraph(4);
const tiles = new Array(graph.nodes.length).fill(0);
console.log("Graph:", graph);

function setTile(row, col, value) {
    const nodeId = row * graph.size + col;

    setValueByNodeId(nodeId, value);
    renderBoard();
}

function loadBoardForTest(testBoard) {
   for (let row = 0; row < graph.size; row++) {
    for (let col = 0; col < graph.size; col++) {
        const nodeId = row * graph.size + col;
        setValueByNodeId(nodeId, testBoard[row][col]);
    }
   }
    renderBoard();
    renderScore();
    checkGameOver();
}

function getEmptyNodeIds() {
    const emptyNodeIds = [];

    for (const node of graph.nodes) {
        if (getValueByNodeId(node.id) === 0) {
            emptyNodeIds.push(node.id);
        }
    }

    return emptyNodeIds;
}

function canMove() {
    if (getEmptyNodeIds().length > 0){
        return true;
    }

    for (const direction in graph.lanesByDirection) {
        const lanes = graph.lanesByDirection[direction];

        for (const lane of lanes) {
            const values = lane.map(nodeId => getValueByNodeId(nodeId));

            if (canLineMove(values)) {
                return true;
            }
        }
    }
    return false;
}

function checkGameOver(){
    if (!canMove()) {
        setMessage("Game over");
    } else {
        setMessage("");
    }
}

function applySpawn(spawnEvent) {
    if (spawnEvent == null) {
        return null;
    }

    setValueByNodeId(spawnEvent.nodeId, spawnEvent.value);
    renderBoard();

    console.log("Spawn event:", spawnEvent);

    return spawnEvent;
}

function spawnTile() {
    const emptyNodeIds = getEmptyNodeIds();
    const spawnEvent = chooseRandomSpawn(emptyNodeIds);

    return applySpawn(spawnEvent);
    }


function renderBoard() {
boardElement.innerHTML = "";
    
for (const node of graph.nodes) {
    const value = getValueByNodeId(node.id);
    const displayValue = value === 0 ? "" : value;
    const cellClass = value === 0 ? "cell": `cell tile-${value}`;

    boardElement.innerHTML += `<div class="${cellClass}">${displayValue}</div>`;
}
}

function renderScore() {
    scoreElement.textContent = score;
}

function setMessage(text) {
    messageElement.textContent = text;
}

function getValueByNodeId(nodeId){
    return tiles[nodeId];
}

function setValueByNodeId(nodeId, value) {
    tiles[nodeId] = value;
}

function moveDirection(direction) {
    const beforeTiles = [...tiles];
    const lanes =  graph.lanesByDirection[direction];
    let scoreGained = 0;

    for (const lane of lanes) {
        const values = lane.map(nodeId => getValueByNodeId(nodeId));
        const result = mergeRowLeft(values);

        for (let i = 0; i < lane.length; i++) {
            setValueByNodeId(lane[i], result.row[i]);
        }
    
        scoreGained += result.scoreGained;
    }

    const afterTiles = [...tiles];
    const moved = createBoardHash(beforeTiles) !== createBoardHash(afterTiles);

    if (moved) {
        score += scoreGained;
        moveNumber++;
        const moveRecord = createMoveRecord({
            moveNumber,
            direction,
            moved,
            scoreGained,
            beforeTiles,
            afterTiles,
        });

        moveLog.push(moveRecord);
        console.log("Move record:", moveRecord);
    }

    renderBoard();

    return moved;
}

function moveLeft() {
    return moveDirection("left");
}

function moveRight() {
    return moveDirection("right");
}

function moveUp() {
    return moveDirection("up");
}

function moveDown() {
    return moveDirection("down");
}

function clearBoard() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i] = 0;
    }
}

function startGame(){
    clearBoard();
    score = 0;
    moveNumber = 0;
    moveLog.length = 0;

    spawnTile();
    spawnTile();

    renderScore();
    setMessage("");

    console.log("Starting board hash:", createBoardHash(tiles));

}


startGame();

window.debug2048 = {
    tiles,
    graph,
    moveLog,
    loadBoardForTest,
    moveDirection,
    createBoardHash,
};

newGameButton.addEventListener("click", function(event) {
    startGame();
});

document.addEventListener("keydown", function(event) {
    let moved = false;
    
    if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown"
) {
    event.preventDefault();
}

    if (event.key === "ArrowLeft") {
       moved =  moveLeft();
    }
    if (event.key === "ArrowRight") {
        moved = moveRight();
    }

    if (event.key === "ArrowUp") {
        moved = moveUp();
    }

    if (event.key === "ArrowDown") {
        moved = moveDown();
    }

    if (moved) {
        if (spawnMode === "automatic") {
        const spawnRecord = spawnTile();
        console.log("Spawn record:", spawnRecord);
        checkGameOver();
        renderScore();
        }

       if (spawnMode == "manual") {
        phase = "spawn";
        setMessage("Choose an empty cell for the spawn");
       }

       console.log("Moved?", moved);
    }
    
});
