import { List } from 'immutable';

import line from './line.js';
import intersects from './intersects.js';
import { nodesMatch } from './usedHelpers.js';

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

function getValidLines(thisNodeResult){
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    const usedLines = getUsedLines();

    const getUsedClicks = appStore.getUsedClicks.bind(appStore);
    const usedClicks = getUsedClicks();

    const getAllNodes = appStore.getAllNodes.bind(appStore);
    let allNodes = getAllNodes();

    const getUsedNodes = appStore.setUsedNodes.bind(appStore);
    const usedNodes = getUsedNodes();

    if(usedClicks.size === 0){
        return null;
    }

    let validLines = List();

    let endPoints = getEndpoints(usedNodes, thisNodeResult.node);

    // console.log('endPoints: ', endPoints);

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
                validLines = validLines.push(thisLine);
            }
        });
    });

    return validLines;
}

export default getValidLines;
