function isUsed(usedNodes, thisNode){
    return usedIndex(usedNodes, thisNode) === -1 ? false : true;
}

function usedIndex(usedNodes, thisNode){
    return usedNodes.findIndex((i) => {
        return nodesMatch(i.get('node'), thisNode);
    });
}

function nodesMatch(node1, node2){
    return Boolean(JSON.stringify(node1) === JSON.stringify(node2));
}

export {
    isUsed,
    nodesMatch,
    usedIndex,
};