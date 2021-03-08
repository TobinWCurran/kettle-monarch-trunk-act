import {
    checkIntersection,
    colinearPointWithinSegment
} from 'line-intersect';

function intersects(thisLine, usedLines) {
    // console.log('intersects usedLines: ', usedLines.toJS());
    const usedLinesJS = usedLines.toJS();

    const x1 = thisLine.start.x;
    const y1 = thisLine.start.y;
    const x2 = thisLine.end.x;
    const y2 = thisLine.end.y;

    const Line1Endpoint1 = { x: x1, y: y1 };
    const Line1Endpoint2 = {x: x2, y: y2};

    let toReturn = false;

    for (let i = 0; i < usedLinesJS.length; i++) {
        let x3 = usedLinesJS[i].start.x;
        let y3 = usedLinesJS[i].start.y;
        let x4 = usedLinesJS[i].end.x;
        let y4 = usedLinesJS[i].end.y;

        // const Line2Endpoint1 = { x: x3, y: y3 };
        // const Line2Endpoint2 = {x: x4, y: y4};
        let thisIntersect = checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
        // console.log('Line1Endpoint1: ', Line1Endpoint1);
        // console.log('Line1Endpoint2: ', Line1Endpoint2);
        // console.log('Line2Endpoint1: ', Line2Endpoint1);
        // console.log('Line2Endpoint2: ', Line2Endpoint2);
        // console.log('thisIntersect: ', thisIntersect);

        if(thisIntersect.type === 'none'){
            toReturn = false;
        }else if(thisIntersect.type === 'intersecting'){
            if(JSON.stringify(thisIntersect.point) === JSON.stringify(Line1Endpoint1)) {
                toReturn = false;
            }else{
                toReturn = true;
                break;
            }
        // }else if(thisIntersect.type === 'colinear'){
            // if(colinearPointWithinSegment(Line1Endpoint1, x3, y3, x4, y4)){
            //     toReturn = true;
            //     break;
            // }
            // if(colinearPointWithinSegment(Line1Endpoint2, x3, y3, x4, y4)){
            //     toReturn = true;
            //     break;
            // }

            // if(colinearPointWithinSegment(Line2Endpoint1, x3, y3, x4, y4)){
            //     toReturn = true;
            //     break;
            // }

            // if(colinearPointWithinSegment(Line2Endpoint2, x3, y3, x4, y4)){
            //     toReturn = true;
            //     break;
            // }
            
            // else{
            //     toReturn = false;
            // }
        }
    }

    return toReturn;
}

export default intersects;
