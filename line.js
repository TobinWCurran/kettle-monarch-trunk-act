function line(isValid, lastClick, thisClick, thisClickNo, turnStart ) {
    if(thisClickNo === 1){
        return null;
    }

    if(!isValid){
        return null;
    }

    if(turnStart){
        return null;
    }

    const startPoint = lastClick.get('node');
    const endPoint = thisClick.get('node');

    return {
        start: startPoint,
        end: endPoint,
    };
}

export default line;

// import { Map } from 'immutable';
// function line(lastClick, thisClick, thisClickNo, turnStart ) {
//     if(thisClickNo === 1){
//         return null;
//     }

//     if(turnStart){
//         return null;
//     }

//     const startPoint = lastClick.get('node');
//     const endPoint = thisClick.get('node');

//     return Map({
//         start: startPoint,
//         end: endPoint,
//     });
// }

// export default line;