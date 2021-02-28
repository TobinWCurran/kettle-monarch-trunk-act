function intersects(thisLine, usedLines) {
    const usedLinesJS = usedLines.toJS();

    const a = thisLine.start.x;
    const b = thisLine.start.y;
    const c = thisLine.end.x;
    const d = thisLine.end.y;

    let toReturn = false;

    for (let i = 0; i < usedLinesJS.length; i++) {
        let p = usedLinesJS[i].start.x;
        let q = usedLinesJS[i].start.y;
        let r = usedLinesJS[i].end.x;
        let s = usedLinesJS[i].end.y;

        let det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);

        if (det === 0) {
            toReturn =  false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

            toReturn = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
        if (toReturn === true){
            break;
        }
    }

    // return usedLines.toJS().reduce((acc, cur) => {
    //     console.log('usedLines reduce cur: ', cur);
    //     console.log('usedLines reduce acc: ', acc);
    //     const p = cur.start.x;
    //     const q = cur.start.y;
    //     const r = cur.end.x;
    //     const s = cur.end.y;

    //     var det, gamma, lambda;
    //     det = (c - a) * (s - q) - (r - p) * (d - b);
    //     console.log('det: ', det);
    //     if (det === 0) {
    //         return false;
    //     } else {
    //         lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    //         console.log('lambda: ', lambda);
    //         gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    //         console.log('gamma: ', gamma);
    //         return Boolean((0 < lambda && lambda < 1) && (0 < gamma && gamma < 1));
    //     }
    // });
    return toReturn;
}

export default intersects;
