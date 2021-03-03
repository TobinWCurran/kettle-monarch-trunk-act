import { Map } from 'immutable';

import {
    setClickNo,
    setIsEndpoint,
    setPlayer,
    setTurnStart,
    setTurn,
    setUsedIndex,
} from './nodeClickedSetters.js';

import remainingMoves from './remainingMoves.js';
import line from './line.js';
import payload from './payload.js';
import validateNode from './validateNode.js';

function nodeClicked(req){
    const { body: thisNode } = req;

    const getUsedClicks = appStore.getUsedClicks.bind(appStore);
    const setUsedClicks = appStore.setUsedClicks.bind(appStore);
    const getUsedNodes = appStore.getUsedNodes.bind(appStore);
    const setUsedNodes = appStore.setUsedNodes.bind(appStore);
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    const setUsedLines = appStore.setUsedLines.bind(appStore);
    
    let usedClicks = getUsedClicks();
    let usedNodes = getUsedNodes();
    const usedLines = getUsedLines();

    const isFirstClick = Boolean(usedClicks.size === 0);
    
    const thisClickNo = setClickNo(usedClicks);

    const turn = setTurn(thisClickNo, usedClicks);

    const turnStart = setTurnStart(usedClicks);

    const usedIndex = setUsedIndex(isFirstClick, usedNodes, thisNode);

    const thisLine = usedNodes.size === 0 ? null : line(usedNodes.last(), thisNode );

    if(usedIndex > -1) {
        usedNodes = usedNodes.update(usedIndex, (i) => {
            return i.set('isEndpoint', false);
        });
    }

    let thisClickResult = Map({
        turnStart: turnStart,
        turn: turn,
        click: thisClickNo,
    });

    const thisNodeResult = Map({
        node: thisNode,
        isEndpoint: setIsEndpoint(isFirstClick, turnStart),
    });

    const hasMoves = !turnStart && remainingMoves(usedNodes, thisNodeResult, thisLine);

    const isValid = validateNode(thisClickResult, thisLine, thisNode);
    
    if(isValid){
        thisClickResult = thisClickResult.set('player', setPlayer(thisClickNo, turn));
        setUsedClicks(usedClicks.push(thisClickResult));
        setUsedNodes(usedNodes.push(thisNodeResult));
        !turnStart && setUsedLines(usedLines.push(thisLine));
    }

    return payload(hasMoves, isValid, thisClickResult.get('player'), thisClickNo, turnStart, thisLine);
}

export default nodeClicked;
