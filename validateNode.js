import {
    isUsed as used,
    usedIndex as index,
    nodesMatch,
} from './usedHelpers.js';


import intersects from './intersects.js';

function validateNode(thisClick, thisLine, thisNode) {
    const turnStart = thisClick.get('turnStart');
    const getUsedNodes = appStore.getUsedNodes.bind(appStore);
    const thisClickNo = thisClick.get('click');
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    const usedLines = getUsedLines();
    const usedNodes = getUsedNodes();

    if (thisClickNo === 1) {
        return true;
    }

    const isUsed = used(usedNodes, thisNode);

    const usedIndex = index(usedNodes, thisNode);

    if(turnStart){
        if (isUsed && usedNodes.get(usedIndex).get('isEndpoint') === true) {
            return true;
        }
        if(!isUsed){
            return false;
        }
    }else {
        if(nodesMatch(usedNodes.last().get('node'), thisNode )){
            return false;
        }
        if(isUsed){
            return false;
        }
        if(usedLines.size === 0){
            return true;
        }
        if(thisLine){
            return !intersects(thisLine, usedLines);
        }
    }

    return true;
}

export default validateNode;

