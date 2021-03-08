function resBody(movesRemain, isValid, thisPlayer, thisClickNo, turnStart, newLine) {

    // console.log('newLine: ', newLine);

    const PLAYER1 = 'Player 1';
    const PLAYER2 = 'Player 2';

    let message = '';

    const playerNo = thisPlayer === 1 ? PLAYER1 : PLAYER2;
    const otherPlayer = thisPlayer === 1 ? PLAYER2 : PLAYER1;

    if(movesRemain === 0){
        return {
            newLine: newLine,
            heading: 'Game Over',
            message: `${otherPlayer} you've lost.`,
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

