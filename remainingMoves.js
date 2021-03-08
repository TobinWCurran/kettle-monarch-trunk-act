import { List } from 'immutable';

import line from './line.js';
import intersects from './intersects.js';

import {
    nodesMatch,
} from './usedHelpers.js';

function getEndpoints(usedNodes){
    let endPoints = List();
    usedNodes.forEach((i) => {
        if(i.get('isEndpoint') === true){
            endPoints = endPoints.push(i);
        }
    });

    return endPoints;
}

function remainingMoves(usedNodes, thisNode) {
    console.log('remainingMoves usedNodes: ', usedNodes.toJS());
    
    if(thisNode){
        console.log('remainingMoves thisNode: ', thisNode.toJS());
        usedNodes = usedNodes.push(thisNode);
    }
    
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    let usedLines = getUsedLines();

    const getAllNodes = appStore.getAllNodes.bind(appStore);
    let allNodes = getAllNodes();

    let endPoints = getEndpoints(usedNodes);
    

    let validMoves = List();

    usedNodes.forEach((node) => {
        let foundIndex = allNodes.findIndex((i) => {
            return nodesMatch(i.toJS(), node.get('node'));
        });

        allNodes = allNodes.delete(foundIndex);
        
    });

    console.log('remainingMoves endPoints: ', endPoints.toJS());
    console.log('remainingMoves allNodes: ', allNodes.toJS());

    endPoints.forEach((endPoint) => {
        allNodes.forEach((node) => {
            console.log('node: ', node.toJS());
            console.log('endPoint: ', endPoint.toJS());
            const thisNode = node.toJS();
            const thisEndpoint = endPoint.get('node');

            const is45 = Math.abs(thisEndpoint.x-thisNode.x) === Math.abs(thisEndpoint.y-thisNode.y);
            const isHor = thisEndpoint.x === thisNode.x;
            const isVert = thisEndpoint.y === thisNode.y;

            let thisLine = line(thisEndpoint, thisNode);

            if(is45 || isHor || isVert) {
                if (intersects(thisLine, usedLines) === false){
                    validMoves = validMoves.push(thisLine);
                }
            }

        });
    });
    console.log('remainingMoves validMoves: ', validMoves.toJS());
    return validMoves;
}

export default remainingMoves;
