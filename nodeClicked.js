import { List, Map } from 'immutable';

import {
    setClickNo,
    setPlayer,
    setTurnStart,
    setTurn,
} from './nodeClickedSetters.js';

import {
    isEndpoint,
    isUsed,
    nodesMatch,
    usedIndex
} from './usedHelpers.js';

import fillUsedNodes from './fillUsedNodes.js';
import remainingMoves from './remainingMoves.js';
import line from './line.js';
import payload from './payload.js';

function nodeClicked(req){
    const { body: thisNode } = req;

    const getUsedClicks = appStore.getUsedClicks.bind(appStore);
    const setUsedClicks = appStore.setUsedClicks.bind(appStore);
    const getUsedNodes = appStore.getUsedNodes.bind(appStore);
    const setUsedNodes = appStore.setUsedNodes.bind(appStore);
    const getUsedLines = appStore.getUsedLines.bind(appStore);
    const setUsedLines = appStore.setUsedLines.bind(appStore);
    const getRemainingMoves = appStore.getRemainingMoves.bind(appStore);
    const setRemainingMoves = appStore.setRemainingMoves.bind(appStore);
    
    let usedClicks = getUsedClicks();
    let usedNodes = getUsedNodes();
    let usedLines = getUsedLines();
    let lastRemainingMoves = getRemainingMoves();
    let isValid = true;

    let thisClickToSave = Map({
        turnStart: true,
        turn: 1,
        click: 1,
        player: 1,
    });

    let thisNodeToSave = Map({
        node: thisNode,
        isEndpoint: true,
    });

    let payloadOptions = {
        movesRemain: true,
        isValid: isValid,
        player: thisClickToSave.get('player'),
        thisClickNo: thisClickToSave.get('click'),
        turnStart: thisClickToSave.get('turnStart'),
        newLine: null,
    };
 
    if(usedLines.size === 0){
        if(usedNodes.size === 0){
            usedNodes = usedNodes.push(thisNodeToSave);
            usedClicks = usedClicks.push(thisClickToSave);
            setUsedClicks(usedClicks);
            setUsedNodes(usedNodes);
            setRemainingMoves(remainingMoves(usedNodes).get('validMoves'));
            return payload(payloadOptions);
        }
    }

    const clickNo = setClickNo(usedClicks);
    const turnStart = setTurnStart(usedClicks);
    const turn = setTurn(clickNo, usedClicks);
    const player = setPlayer(turn);

    let thisLine = null;
    let movesRemain = 1;

    thisNodeToSave = thisNodeToSave.set('isEndpoint', turnStart);

    if(turnStart){
        if(isUsed(usedNodes, thisNode)){
            if(isEndpoint(usedNodes, thisNode)){
                if(!nodesMatch(thisNode, usedNodes.last().get('node'))){
                    usedNodes = usedNodes.delete(usedIndex(usedNodes, thisNode));
                    usedNodes = usedNodes.push(Map({
                        node: thisNode,
                        isEndpoint: true,
                    }));
                }

                thisNodeToSave = Map({
                    node: thisNode,
                    isEndpoint: true,
                });

                movesRemain = remainingMoves(usedNodes).get('validMoves');

                if(movesRemain.size > 0){
                    isValid = true;

                    usedNodes = usedNodes.update(usedIndex(usedNodes, thisNode), (i) => {
                        return i.set('isEndpoint', false);
                    });
                    setRemainingMoves(movesRemain);
                    setUsedNodes(usedNodes);
                }
            }else{
                payloadOptions = {
                    ...payloadOptions,
                    movesRemain: true,
                    isValid: false,
                    player: player,
                    thisClickNo: clickNo,
                    turnStart: turnStart,
                    newLine: null,
                };
                return payload(payloadOptions);
            }
        }else{
            payloadOptions = {
                ...payloadOptions,
                movesRemain: true,
                isValid: false,
                player: player,
                thisClickNo: clickNo,
                turnStart: turnStart,
                newLine: null,
            };
            return payload(payloadOptions);
        }
    } else {
        if(nodesMatch(thisNode, usedNodes.last().get('node'))){
            let lastUsedNodes = getUsedNodes();
            let lastUsedClicks = getUsedClicks();
            let lastRemainingMoves = getRemainingMoves();

            if(lastUsedClicks.size === 1){
                setUsedClicks(List());
                setUsedNodes(List());
                setRemainingMoves(List());
                return payload({
                    ...payloadOptions,
                    player: 0
                });
            }else{
                lastUsedNodes = usedNodes.update(usedIndex(usedNodes, thisNode), (i) => {
                    return i.set('isEndpoint', true);
                });
                lastUsedClicks = lastUsedClicks.delete(lastUsedClicks.lastIndexOf());
                lastRemainingMoves = lastRemainingMoves.delete(lastRemainingMoves.lastIndexOf());
                payloadOptions = {
                    ...payloadOptions,
                    movesRemain: true,
                    isValid: true,
                    player: lastUsedClicks.last().get('player'),
                    thisClickNo: lastUsedClicks.last().get('click'),
                    turnStart: lastUsedClicks.last().get('turnStart'),
                    newLine: null,
                    reselect: true,
                };
                setUsedClicks(lastUsedClicks);
                setUsedNodes(lastUsedNodes);
                setRemainingMoves(lastRemainingMoves);
                return payload(payloadOptions);
            }   
        }

        thisLine = line(usedNodes.last(), thisNode );

        thisNodeToSave = Map({
            node: thisNode,
            isEndpoint: true,
        });

        isValid = lastRemainingMoves.findIndex((line) => {
            return nodesMatch(thisLine, line);
        }) === -1 ? false : true;

        usedNodes = usedNodes.concat(fillUsedNodes(thisLine));

        if(isValid){
            const theseRemainingMoves = remainingMoves(usedNodes);
            movesRemain = theseRemainingMoves.get('validMoves');
            const invalidEndpoint = theseRemainingMoves.get('invalidEndpoint');

            if(invalidEndpoint !== null){
                usedNodes = usedNodes.update(usedIndex(usedNodes, invalidEndpoint.get('node')), (i) => {
                    return i.set('isEndpoint', false);
                });
            }

            setRemainingMoves(movesRemain.get('validMoves'));
            setUsedLines(usedLines.push(thisLine));
            setUsedNodes(usedNodes);
        }

    }

    thisClickToSave = Map({
        turnStart: turnStart,
        turn: turn,
        click: clickNo,
        player: player,
    });

    payloadOptions = {
        movesRemain: movesRemain.size,
        isValid: isValid,
        player: thisClickToSave.get('player'),
        thisClickNo: thisClickToSave.get('click'),
        turnStart: thisClickToSave.get('turnStart'),
        newLine: thisLine,
    };

    if(isValid){
        setUsedClicks(usedClicks.push(thisClickToSave));
    }else{
        payloadOptions = {
            ...payloadOptions,
            movesRemain: true,
            isValid: false,
            player: player,
            thisClickNo: clickNo,
            turnStart: turnStart,
            newLine: null,
        };
        return payload(payloadOptions);
    }
    
    return payload(payloadOptions);
}

export default nodeClicked;
