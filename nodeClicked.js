import { Map } from 'immutable';

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

    let isValid = true;

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
    
    // This handles subsequent turns

    const clickNo = setClickNo(usedClicks);
    const turnStart = setTurnStart(usedClicks);
    const turn = setTurn(clickNo, usedClicks);
    const player = setPlayer(turn);

    console.log('clickNo: ', clickNo);
    console.log('turnStart: ', turnStart);
    console.log('turn: ', turn);
    console.log('player: ', player);

    let thisLine = null;

    let movesRemain = 1;

    thisNodeToSave = thisNodeToSave.set('isEndpoint', turnStart);

    // We Need to know if this is the turn start
    if(turnStart){
        console.log('******************* TURN START **********************');
        // If it's a turn start, it has to be one of the Endpoints.
        // To be an endpoint, it has to be a used node first off.

        if(isUsed(usedNodes, thisNode)){
            // is it an Endpoint

            if(isEndpoint(usedNodes, thisNode)){

                if(!nodesMatch(thisNode, usedNodes.last().get('node'))){
                    //If this node is not the last node, we need to get the index of the node that was clicked.

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
            }else{ // If it's not an endpoint
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
    } else { //Turn End
        console.log('******************* TURN END **********************');

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

            // We need to find out if there is only one start point

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
        thisClickNo: thisClickToSave.get('clickNo'),
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
