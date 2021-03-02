import resBody from './resBody.js';
import resMessage from './resMessage.js';

function payLoad(hasMoves, isValid, thisPlayer, thisClickNo, turnStart, line) {
    return {
        msg: resMessage(hasMoves, isValid, thisClickNo, turnStart),
        body: resBody(hasMoves, isValid, thisPlayer, thisClickNo, turnStart, line),
    };
}

export default payLoad;
