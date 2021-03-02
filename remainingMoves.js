import { List } from 'immutable';

import line from './line.js';
import intersects from './intersects.js';

import {
    nodesMatch,
} from './usedHelpers.js';

function getEndpoints(usedNodes, thisNode){
    let endPoints = List();
    usedNodes.forEach((i) => {
        if(i.get('isEndpoint') === true){
            endPoints = endPoints.push(i.get('node'));
        }
    });
    endPoints = endPoints.push(thisNode);
    return endPoints;
}

function remainingMoves(usedNodes, thisNodeResult, thisLine) {
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    let usedLines = getUsedLines();
    usedLines = usedLines.push(thisLine);

    const getAllNodes = appStore.getAllNodes.bind(appStore);
    let allNodes = getAllNodes();

    let endPoints = getEndpoints(usedNodes, thisNodeResult.get('node'));

    let validMoves = 0;

    endPoints.forEach((endPoint) => {
        let foundIndex = allNodes.findIndex((i) => {
            return nodesMatch(i, endPoint);
        });

        allNodes = allNodes.delete(foundIndex);
    });

    endPoints.forEach((endPoint) => {
        allNodes.forEach((node) => {
            let thisLine = line(endPoint, node.toJS());

            if (intersects(thisLine, usedLines) === false){
                validMoves = validMoves + 1;
            }
        });
    });
    return validMoves;
}

export default remainingMoves;
