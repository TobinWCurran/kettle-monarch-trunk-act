import {
    isUsed as used,
    usedIndex as index,
} from './usedHelpers.js';

function validateNode(thisClick, lastClick) {
    const thisNode = thisClick.get('node');
    const lastNode = lastClick ? lastClick.get('node') : {};
    const thisPlayer = thisClick.get('player');
    const turnStart = thisClick.get('turnStart');
    const usedNodes = appStore.getUsed();

    const thisTurn = thisClick.get('turn');
    const thisClickNo = thisClick.get('click');

    if (thisClickNo === 1) {
        return true;
    }

    const isUsed = used(usedNodes, thisNode);
    const usedIndex = index(usedNodes, thisNode);

    if (isUsed && usedNodes.get(usedIndex).get('isEndpoint') === true) {
        return true;
    }

    if(turnStart && JSON.stringify(thisNode) !== JSON.stringify(lastNode)){
        return false;
    }

    if(!turnStart && isUsed){
        return false;
    }

    if(!turnStart && (Math.abs(thisNode.x - lastNode.x) === 1 || Math.abs(thisNode.y - lastNode.y) === 1)){
        return true;
    }

    return true;
}

export default validateNode;
