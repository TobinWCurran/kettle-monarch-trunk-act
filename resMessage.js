function resMessage(movesRemain, isValid, player, thisClickNo, turnStart, reselect) {
    const messages = {
        VALID_START_NODE: 'VALID_START_NODE',
        INVALID_START_NODE: 'INVALID_START_NODE',
        VALID_END_NODE: 'VALID_END_NODE',
        INVALID_END_NODE: 'INVALID_END_NODE',
        GAME_OVER: 'GAME_OVER',
        STATE_UPDATE: 'STATE_UPDATE',
        UPDATE_TEXT: 'UPDATE_TEXT',
    };

    if(player === 0) {
        return messages.UPDATE_TEXT;
    }

    if(reselect){
        return messages.UPDATE_TEXT;
    }

    if(movesRemain === 0){
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