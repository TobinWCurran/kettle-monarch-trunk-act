import { List, Map } from 'immutable';

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

function remainingMoves(usedNodes) {
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    let usedLines = getUsedLines();

    const getAllNodes = appStore.getAllNodes.bind(appStore);
    let allNodes = getAllNodes();

    let endPoints = getEndpoints(usedNodes);
    
    let validMoves = List();
    let validEndpoints = List();
    let invalidEndpoints = List();

    usedNodes.forEach((node) => {
        let foundIndex = allNodes.findIndex((i) => {
            return nodesMatch(i.toJS(), node.get('node'));
        });

        allNodes = allNodes.delete(foundIndex);
        
    });

    endPoints.forEach((endPoint) => {
        allNodes.forEach((node) => {
            const thisNode = node.toJS();
            const thisEndpoint = endPoint.get('node');

            const is45 = Math.abs(thisEndpoint.x-thisNode.x) === Math.abs(thisEndpoint.y-thisNode.y);
            const isHor = thisEndpoint.x === thisNode.x;
            const isVert = thisEndpoint.y === thisNode.y;

            let thisLine = line(thisEndpoint, thisNode);

            if(is45 || isHor || isVert) {
                if (intersects(thisLine, usedLines) === false){
                    validMoves = validMoves.push(thisLine);
                    validEndpoints = validEndpoints.push(endPoint);
                }else{
                    invalidEndpoints = invalidEndpoints.push(endPoint);
                }
            }
        });
    });


    validEndpoints = validEndpoints.reduce((acc, datum, i) => {
        if(i=== 0){
            return acc.push(Map(datum.get('node')));
        }
        if(nodesMatch(datum.get('node'), acc.last())){
            return acc;
        }
        return acc.push(Map(datum.get('node')));
    }, List());

    if(validEndpoints.size === 1 && usedNodes.size > 1){
        endPoints = endPoints.filter((endPoint) => {
            if(nodesMatch(validEndpoints.get(0), endPoint.get('node'))){
                return false;
            }else{
                return true;
            }
        });
    }

    return Map({
        validMoves: validMoves,
        invalidEndpoint: endPoints.size === 1 ? endPoints.get(0): null,
    });
}

export default remainingMoves;
