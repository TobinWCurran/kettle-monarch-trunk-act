import { usedIndex } from './usedHelpers.js';

function setClickNo(usedClicks) {
    return usedClicks.last().get('click') + 1;
}

function setLastClick(usedClicks){
    return usedClicks.last().get('click');
}

function setLastTurn(usedClicks){
    return usedClicks.last().get('turn');
}

function setPlayer(turn) {
    if(turn%2 === 0){
        return 2;
    }
    return 1;
}

function setTurn(thisClickNo, usedClicks) {
    if(thisClickNo <= 2){
        return 1;
    }
    return thisClickNo%2 === 0 ? usedClicks.last().get('turn') : usedClicks.last().get('turn') + 1;
}

function setTurnStart(usedClicks) {
    console.log('usedClicks: ', usedClicks.toJS());
    if((usedClicks.last().get('click')) % 2 === 0){
        
        return true;
    }
    return false;
}

function setUsedIndex(usedNodes, thisNode) {
    return usedIndex(usedNodes, thisNode);
}

export {
    setClickNo,
    setLastClick,
    setLastTurn,
    setPlayer,
    setTurnStart,
    setTurn,
    setUsedIndex,
};
