function resBody(movesRemain, isValid, player, thisClickNo, turnStart, newLine, reselect) {

    // console.log('newLine: ', newLine);

    const PLAYER1 = 'Player 1';
    const PLAYER2 = 'Player 2';

    let message = '';

    const playerNo = player === 1 ? PLAYER1 : PLAYER2;
    const otherPlayer = player === 1 ? PLAYER2 : PLAYER1;

    if(player === 0){
        return {
            newLine: null,
            heading: 'Player 1',
            message: 'Choose a new start point, Player 1.',
        };
    }

    if(reselect){
        return {
            heading: playerNo,
            message: `${playerNo} choose another start point.`,
            newLine: null,
        };
    }

    if(movesRemain === 0){
        return {
            newLine: newLine,
            heading: 'Game Over',
            message: `${playerNo} you've lost.`,
        };
    }

    if(thisClickNo === 1){
        message = `${playerNo} finish your turn.`;
    }
    else if(turnStart && isValid){
        message = `${playerNo} end your turn.`;
        newLine = null;
    }

    else if(turnStart && !isValid){
        message = `That is an invalid start, ${playerNo}`;
        newLine = null;
    }

    else if(!turnStart && isValid){
        message = `${playerNo} start your turn.`;
    }

    else if(!turnStart && !isValid){
        message = `That is an invalid end, ${playerNo}`;
        newLine = null;
    }

    const stateUpdate = {
        newLine: newLine,
        heading: playerNo,
        message: message,
    };

    return stateUpdate;
}

export default resBody;

