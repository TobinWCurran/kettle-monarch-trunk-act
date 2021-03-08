import resBody from './resBody.js';
import resMessage from './resMessage.js';

function payLoad(options) {
    const {
        movesRemain,
        isValid,
        player,
        thisClickNo,
        turnStart,
        newLine
    } = options;

    return {
        msg: resMessage(movesRemain, isValid, thisClickNo, turnStart),
        body: resBody(movesRemain, isValid, player, thisClickNo, turnStart, newLine),
    };
}

export default payLoad;
