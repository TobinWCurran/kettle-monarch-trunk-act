import line from './line.js';
import intersects from './intersects.js';

function resBody(isValid, lastClick, thisPlayer, thisClick, thisClickNo, turnStart) {

    const PLAYER1 = 'Player 1';
    const PLAYER2 = 'Player 2';

    const getUsedLines = appStore.getUsedLines.bind(appStore);
    const usedLines = getUsedLines();
    const setUsedLines = appStore.setUsedLines.bind(appStore);

    console.log('usedLines start: ', usedLines.toJS());

    let message = '';

    const playerNo = thisPlayer === 1 ? PLAYER1 : PLAYER2;

    if(thisClickNo === 1){
        message = `${playerNo} finish your turn.`;
    }
    else if(turnStart && isValid){
        message = `${playerNo} end your turn.`;
    }

    else if(turnStart && !isValid){
        message = `That is an invalid start, ${playerNo}`;
    }

    else if(!turnStart && isValid){
        message = `${playerNo} start your turn.`;
    }

    else if(!turnStart && !isValid){
        message = `That is an invalid end, ${playerNo}`;
    }

    let thisLine = turnStart ? null : line(isValid, lastClick, thisClick, thisClickNo, turnStart);

    const theseUsedLines = turnStart ? usedLines : usedLines.push(thisLine);
    const hasIntersection = turnStart ? false : intersects(thisLine, theseUsedLines);

    if(hasIntersection){
        thisLine = null;
        message = `That crosses a line, and that's no good, ${playerNo}`;
    }

    const stateUpdate = {
        newLine: thisLine,
        heading: playerNo,
        message: message,
    };

    setUsedLines(theseUsedLines);
    return stateUpdate;
}

export default resBody;

