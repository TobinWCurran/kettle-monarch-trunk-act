import resBody from './resBody.js';
import resMessage from './resMessage.js';

function payLoad(options) {
    const {
        movesRemain,
        isValid,
        player,
        thisClickNo,
        turnStart,
        newLine,
        reselect
    } = options;

    return {
        msg: resMessage(movesRemain, isValid, player, thisClickNo, turnStart, reselect),
        body: resBody(movesRemain, isValid, player, thisClickNo, turnStart, newLine, reselect),
    };
}

export default payLoad;
