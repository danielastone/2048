export function slideRowLeft(row) {
    const nonZeroTiles = row.filter(value => value !== 0);

    while (nonZeroTiles.length < 4) {
        nonZeroTiles.push(0);
    };

    return nonZeroTiles;
}
export function mergeRowLeft(row) {
    const movedRow=slideRowLeft(row);
    let scoreGained = 0;

    for (let i = 0; i < 3; i++) {
        if (movedRow[i] !== 0 && movedRow[i] === movedRow[i+1]) {
            movedRow[i] = movedRow[i]*2;
            scoreGained += movedRow[i];
            movedRow[i+1] = 0;
        }
    }

    return{
        row: slideRowLeft(movedRow),
        scoreGained: scoreGained, 
    };
}

export function canLineMove(values) {
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] !== 0 && values[i] === values [i+1]) {
            return true;
        }
    }

    return false;
}