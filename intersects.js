import { checkIntersection } from 'line-intersect';

function intersects(thisLine, usedLines) {
    // console.log('intersects usedLines: ', usedLines.toJS());
    const usedLinesJS = usedLines.toJS();

    const x1 = thisLine.start.x;
    const y1 = thisLine.start.y;
    const x2 = thisLine.end.x;
    const y2 = thisLine.end.y;

    const Line1Endpoint1 = { x: x1, y: y1 };

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
            if(JSON.stringify(thisIntersect.point) === JSON.stringify(Line1Endpoint1)) {
                toReturn = false;
            }else{
                toReturn = true;
                break;
            }
        }
    }

    return toReturn;
}

export default intersects;
