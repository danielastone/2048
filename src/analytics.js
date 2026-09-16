export function createBoardHash(tiles) {
    return tiles.join(",");
}

export function summarizeTiles(tiles) {
    let emptyCount = 0;
    let maxTile = 0;
    let tileSum = 0;

    for (const value of tiles) {
        if (value === 0) {
            emptyCount++;
        }

        if (value > maxTile) {
            maxTile = value;
        }

        tileSum += value;
    }

    return {
        emptyCount,
        maxTile,
        tileSum,
    }
}

export function createMoveRecord({
    moveNumber,
    direction,
    moved,
    scoreGained,
    beforeTiles,
    afterTiles
}) {
    const beforeSummary = summarizeTiles(beforeTiles);
    const afterSummary = summarizeTiles(afterTiles);

    return {
        moveNumber,
        direction,
        moved,
        scoreGained,
        beforeHash: createBoardHash(beforeTiles),
        afterHash: createBoardHash(afterTiles),
        emptyBefore: beforeSummary.emptyCount,
        emptyAfter: afterSummary.emptyCount,
        maxBefore: beforeSummary.maxTile,
        maxAfter: afterSummary.maxTile,
        tileSumBefore: beforeSummary.tileSum,
        tileSumAfter: afterSummary.tileSum,
    }
}