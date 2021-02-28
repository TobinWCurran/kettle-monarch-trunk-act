import {
    isUsed as used,
    usedIndex as index,
} from './usedHelpers.js';

function validateNode(thisClick, lastClick) {
    const thisNode = thisClick.get('node');
    const lastNode = lastClick ? lastClick.get('node') : {};
    const turnStart = thisClick.get('turnStart');
    const usedNodes = appStore.getUsed();
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

    console.log('usedNodes: ', usedNodes.toJS());
    console.log('Math.abs(thisNode.x - lastNode.x): ', Math.abs(thisNode.x - lastNode.x));
    console.log('Math.abs(thisNode.y - lastNode.y): ', Math.abs(thisNode.y - lastNode.y));
    if(!turnStart && (Math.abs(thisNode.x - lastNode.x) === 1 || Math.abs(thisNode.y - lastNode.y) === 1)){
        return true;
    }

    return true;
}

export default validateNode;

