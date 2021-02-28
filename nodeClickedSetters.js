import {
    isUsed,
    usedIndex,
} from './usedHelpers.js';

function setClickNo(isFirstClick, lastClick) {
    return isFirstClick ? 1 : lastClick.get('click') + 1;
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

function setIsInput(isFirstClick, turnStart) {
    if(isFirstClick){
        return true;
    }
    if(turnStart){
        return false;
    }
    return true;
}

function setIsUsed(isFirstClick, usedClicks, thisNode) {
    return isFirstClick ? false : isUsed(usedClicks, thisNode);
}

function setLastClick(isFirstClick, usedClicks){
    return isFirstClick ? null : usedClicks.last();
}

function setPlayer(isFirstClick, lastClick) {
    return isFirstClick ? 1 : lastClick.get('player');
}

function setThisPlayer(thisTurn) {
    return thisTurn % 2 === 0 ? 2 : 1;
}

function setThisTurn(thisClickNo, player) {
    return thisClickNo%2 === 0 ? player + 1 : player;
}

function setTurnStart(thisClickNo) {
    return thisClickNo%2 === 0 ? false : true;
}

function setUsedIndex(isFirstClick, usedClicks, thisNode) {
    return isFirstClick ? -1 : usedIndex(usedClicks, thisNode);
}

export {
    setClickNo,
    setIsEndpoint,
    setIsInput,
    setIsUsed,
    setLastClick,
    setPlayer,
    setThisPlayer,
    setThisTurn,
    setTurnStart,
    setUsedIndex,
};
