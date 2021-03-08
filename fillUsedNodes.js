import { List, Map } from 'immutable';

function fillUsedNodes(thisLine){
    const xDiff = Math.abs(thisLine.start.x - thisLine.end.x);
    const yDiff = Math.abs(thisLine.start.y - thisLine.end.y);

    // This coordinate system is reversed from the standard.
    const m = -1 * (thisLine.end.y - thisLine.start.y) / (thisLine.end.x - thisLine.start.x);

    let toReturn = List();
    if(xDiff > 0 && yDiff > 0){
        if(m === 1){
            if(thisLine.start.x > thisLine.end.x){
                for(let i = 1; i <= xDiff; i ++){
                    toReturn = toReturn.push(Map({
                        node: {
                            x: thisLine.start.x - i,
                            y: thisLine.start.y + i
                        },
                        isEndpoint: i === xDiff ? true : false,
                    }));
                }
            }else{
                for(let i = 1; i <= xDiff; i ++){
                    toReturn = toReturn.push(Map({
                        node: {
                            x: thisLine.start.x + i,
                            y: thisLine.start.y - i
                        },
                        isEndpoint: i === xDiff ? true : false,
                    }));
                }
            }
        }else {
            if(thisLine.start.y > thisLine.end.y){
                for(let i = 1; i <= yDiff; i ++){
                    toReturn = toReturn.push(Map({
                        node: {
                            x: thisLine.start.x - i,
                            y: thisLine.start.y - i
                        },
                        isEndpoint: i === yDiff ? true : false,
                    }));
                }
            }else{
                for(let i = 1; i <= yDiff; i ++){
                    toReturn = toReturn.push(Map({
                        node: {
                            x: thisLine.start.x + i,
                            y: thisLine.start.y + i
                        },
                        isEndpoint: i === yDiff ? true : false,
                    }));
                }
            }
        }
    }
    if(xDiff > 0 && yDiff === 0){
        if(thisLine.start.x > thisLine.end.x) {
            for(let i = 1; i <= xDiff; i ++){
                toReturn = toReturn.push(Map({
                    node: {
                        x: thisLine.start.x - i,
                        y: thisLine.start.y
                    },
                    isEndpoint: i === xDiff ? true : false,
                }));
            }
        }
        else {
            for(let i = 1; i <= xDiff; i ++){
                toReturn = toReturn.push(Map({
                    node: {
                        x: thisLine.start.x + i,
                        y: thisLine.start.y
                    },
                    isEndpoint: i === xDiff ? true : false,
                }));
            }
        }
    }
    if(yDiff > 0 & xDiff === 0){
        if(thisLine.start.y > thisLine.end.y){
            for(let i = 1; i <= yDiff; i ++){
                toReturn = toReturn.push(Map({
                    node: {
                        x: thisLine.start.x,
                        y: thisLine.start.y - i
                    },
                    isEndpoint: i === yDiff ? true : false,
                }));
            }
        } else {
            for(let i = 1; i <= yDiff; i ++){
                toReturn = toReturn.push(Map({
                    node: {
                        x: thisLine.start.x,
                        y: thisLine.start.y + i
                    },
                    isEndpoint: i === yDiff ? true : false,
                }));
            }
        }
    }
    return toReturn;
}

export default fillUsedNodes;
