import resBody from './resBody.js';
import resMessage from './resMessage.js';

function payLoad(isValid, lastClick, thisPlayer, thisClick, thisClickNo, turnStart) {
    return {
        msg: resMessage(isValid, thisClickNo, turnStart),
        body: resBody(isValid, lastClick, thisPlayer, thisClick, thisClickNo, turnStart),
    };
}

export default payLoad;


// function payLoad(isValid, line, thisPlayer, thisClickNo, turnStart) {
//     return {
//         msg: resMessage(isValid, thisClickNo, turnStart),
//         body: resBody(isValid, line, thisPlayer, thisClickNo, turnStart),
//     };
// }

// export default payLoad;