export function chooseRandomSpawn(emptyNodeIds) {
    if (emptyNodeIds.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * emptyNodeIds.length);
    const nodeId = emptyNodeIds[randomIndex];

    return {
        type: "random",
        nodeId,
        value: 2,
    };
}

export function chooseManualSpawn(nodeId, emptyNodIds, value = 2) {
    if (!emptyNodeIds.include(nodeId)) {
        return null;
    }

    return {
        type: "manual",
        nodeId,
        value,
    };
}

