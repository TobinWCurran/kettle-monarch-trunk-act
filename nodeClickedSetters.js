function setClickNo(usedClicks) {
    return usedClicks.last().get('click') + 1;
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
    if((usedClicks.last().get('click')) % 2 === 0){
        
        return true;
    }
    return false;
}

export {
    setClickNo,
    setPlayer,
    setTurnStart,
    setTurn,
};
