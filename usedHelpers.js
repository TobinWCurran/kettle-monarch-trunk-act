function isEndpoint(usedNodes, thisNode){
    let isEndpoint = false;

    usedNodes.forEach((node) => {
        if(nodesMatch(node.get('node'), thisNode)){
            if( node.get('isEndpoint') === true) {
                isEndpoint = true;
            }
        }
    });

    return isEndpoint;
}

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
    isEndpoint,
    isUsed,
    nodesMatch,
    usedIndex,
};