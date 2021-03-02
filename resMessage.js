function resMessage(hasMoves, isValid, thisClickNo, turnStart) {
    const messages = {
        VALID_START_NODE: 'VALID_START_NODE',
        INVALID_START_NODE: 'INVALID_START_NODE',
        VALID_END_NODE: 'VALID_END_NODE',
        INVALID_END_NODE: 'INVALID_END_NODE',
        GAME_OVER: 'GAME_OVER',
        STATE_UPDATE: 'STATE_UPDATE',
    };

    if(hasMoves === 0){
        return messages.GAME_OVER;
    }

    if(thisClickNo === 1){
        return messages.VALID_START_NODE;
    }
    if(turnStart && isValid){
        return messages.VALID_START_NODE;
    }

    if(turnStart && !isValid){
        return messages.INVALID_START_NODE;
    }

    if(!turnStart && isValid){
        return messages.VALID_END_NODE;
    }

    if(!turnStart && !isValid){
        messages.INVALID_END_NODE;
    }
    return messages.STATE_UPDATE;
}

export default resMessage;