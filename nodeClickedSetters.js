import { usedIndex } from './usedHelpers.js';

function setClickNo(usedClicks) {
    if(usedClicks.size === 0){
        return 1;
    }
    return usedClicks.last().get('click') + 1;
}

function setIsEndpoint(isFirstClick, turnStart) {
    if(isFirstClick){
        return true;
    }
    if(turnStart){
        return false;
    }
    return true;
}

function setLastClick(usedClicks){
    return usedClicks.last().get('click');
}

function setLastTurn(usedClicks){
    return usedClicks.last().get('turn');
}

function setPlayer(thisClickNo, turn) {
    if(thisClickNo === 1){
        return 1;
    }
    if(turn%2 === 0){
        return 1;
    }
    return 2;
}

function setTurn(thisClickNo, usedClicks) {
    if(thisClickNo <= 2){
        return 1;
    }
    return thisClickNo%2 === 0 ? usedClicks.last().get('turn') + 1 : usedClicks.last().get('turn');
}

function setTurnStart(usedClicks) {
    if(usedClicks.size === 0){
        return true;
    }
    if((usedClicks.last().get('click')) % 2 === 0){
        return true;
    }
    return false;
}

function setUsedIndex(isFirstClick, usedNodes, thisNode) {
    return isFirstClick ? -1 : usedIndex(usedNodes, thisNode);
}

export {
    setClickNo,
    setIsEndpoint,
    setLastClick,
    setLastTurn,
    setPlayer,
    setTurnStart,
    setTurn,
    setUsedIndex,
};
