import { Map } from 'immutable';
function line(lastNode, thisNode) {
    const startPoint = Map.isMap(lastNode) ? lastNode.get('node') : lastNode;
    const endPoint = Map.isMap(thisNode) ? thisNode.get('node'): thisNode;

    return {
        start: startPoint,
        end: endPoint,
    };
}

export default line;
