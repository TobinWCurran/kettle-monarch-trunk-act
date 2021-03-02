import {
    checkIntersection,
    colinearPointWithinSegment
} from 'line-intersect';

function intersects(thisLine, usedLines) {
    const usedLinesJS = usedLines.toJS();

    const x1 = thisLine.start.x;
    const y1 = thisLine.start.y;
    const x2 = thisLine.end.x;
    const y2 = thisLine.end.y;

    const endPoint1Line1 = { x: thisLine.start.x, y: thisLine.start.y };
    const endPoint2Lin1 = {x: thisLine.end.x, y: thisLine.end.y};

    let toReturn = false;

    for (let i = 0; i < usedLinesJS.length; i++) {
        let x3 = usedLinesJS[i].start.x;
        let y3 = usedLinesJS[i].start.y;
        let x4 = usedLinesJS[i].end.x;
        let y4 = usedLinesJS[i].end.y;

        let thisIntersect = checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4);

        if(thisIntersect.type === 'none'){
            toReturn = false;
        }else if(thisIntersect.type === 'intersecting'){
            if(JSON.stringify(thisIntersect.point) === JSON.stringify(endPoint1Line1)) {
                toReturn = false;
            }else{
                toReturn = true;
                break;
            }
        }else if(thisIntersect.type === 'colinear'){
            if(colinearPointWithinSegment(endPoint2Lin1, x3, y3, x4, y4)){
                toReturn = true;
                break;
            }else{
                toReturn = false;
            }
        }
    }

    return toReturn;
}

export default intersects;
