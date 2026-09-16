export function createSquareGridGraph(size) {
    const nodes = [];
    const neighborsbyNodeId = {};
    const lanesByDirection = {
        left: [],
        right: [],
        up: [],
        down: [],
    };

for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
        const id = row * size + col;

        nodes.push({id, row, col});

        neighborsbyNodeId[id] = {
            left: col > 0 ? id - 1: null,
            right: col < size - 1 ? id + 1: null,
            up: row > 0 ? id - size : null,
            down: row < size - 1 ? id + size : null,
        };
    }
}

for (let row = 0; row < size; row++) {
    const leftLane = [];

    for (let col = 0; col < size; col++) {
        leftLane.push(row * size + col);
    }

    lanesByDirection.left.push(leftLane)
    lanesByDirection.right.push([...leftLane].reverse());
}

for (let col = 0; col < size; col++) {
    const upLane = [];

    for (let row = 0; row < size; row++) {
        upLane.push(row * size + col);
    }

    lanesByDirection.up.push(upLane);
    lanesByDirection.down.push([...upLane].reverse());
}

return {
    size,
    nodes,
    neighborsbyNodeId,
    lanesByDirection,
};

}