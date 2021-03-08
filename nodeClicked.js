import { List, Map } from 'immutable';

import {
    setClickNo,
    setLastClick,
    setLastTurn,
    setPlayer,
    setTurnStart,
    setTurn,
    setUsedIndex,
} from './nodeClickedSetters.js';

import {
    isEndpoint,
    isUsed,
    nodesMatch,
    usedIndex
} from './usedHelpers.js';

import fillUsedNodes from './fillUsedNodes.js';
import getValidLines from './getValidLines.js';
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
    const getRemainingMoves = appStore.getRemainingMoves.bind(appStore);
    const setRemainingMoves = appStore.setRemainingMoves.bind(appStore);
    
    let usedClicks = getUsedClicks();
    let usedNodes = getUsedNodes();
    let usedLines = getUsedLines();
    let lastRemainingMoves = getRemainingMoves();

    console.log('usedClick: ', usedClicks.toJS());

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
 
    // This Hanldes the first turn
    if(usedLines.size === 0){
        if(usedNodes.size === 0){
            usedNodes = usedNodes.push(thisNodeToSave);
            usedClicks = usedClicks.push(thisClickToSave);
            setUsedClicks(usedClicks);
            setUsedNodes(usedNodes);
            setRemainingMoves(remainingMoves(usedNodes));
            return payload(payloadOptions);
        }
    }
    
    // This handles subsequent turns

    const clickNo = setClickNo(usedClicks);
    const turnStart = setTurnStart(usedClicks);
    const turn = setTurn(clickNo, usedClicks);
    const player = setPlayer(turn);

    let thisLine = null;

    let movesRemain = 1;

    thisNodeToSave = thisNodeToSave.set('isEndpoint', turnStart);


    console.log('thisNodeToSave: ', thisNodeToSave.toJS());
    console.log('turnStart: ', turnStart);
    
    // thisNodeToSave = Map({
    //     node: thisNode,
    //     isEndpoint: !turnStart,
    // });


    // We Need to know if this is the turn start
    if(turnStart){
        console.log('******************* TURN START **********************');
        // If it's a turn start, it has to be one of the Endpoints.
        // To be an endpoint, it has to be a used node first off.
        console.log('usedNodes: ', usedNodes.toJS());
        if(isUsed(usedNodes, thisNode)){
            // is it an Endpoint

            if(isEndpoint(usedNodes, thisNode)){

                if(!nodesMatch(thisNode, usedNodes.last().get('node'))){
                    usedNodes = usedNodes.shift();
                    usedNodes = usedNodes.push(Map({
                        node: thisNode,
                        isEndpoint: true,
                    }));
                }

                thisNodeToSave = Map({
                    node: thisNode,
                    isEndpoint: true,
                });

                console.log('turn start usedNodes: ', usedNodes.toJS());
                console.log('turn start thisNode: ', thisNode);
                movesRemain = remainingMoves(usedNodes);

                if(movesRemain.size > 0){
                    isValid = true;

                    usedNodes = usedNodes.update(usedIndex(usedNodes, thisNode), (i) => {
                        return i.set('isEndpoint', false);
                    });
                    setRemainingMoves(movesRemain);
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
        console.log('usedNodes: ', usedNodes.toJS());
        thisLine = line(usedNodes.last(), thisNode );
        console.log('thisLine: ', thisLine);
        console.log('lastRemainingMoves: ',  lastRemainingMoves.toJS());

        thisNodeToSave = Map({
            node: thisNode,
            isEndpoint: true,
        });

        isValid = lastRemainingMoves.findIndex((line) => {
            return nodesMatch(thisLine, line);
        }) === -1 ? false : true;

        console.log('isValid: ', isValid);

        // usedNodes = usedNodes.concat(fillUsedNodes(thisLine));

       
        console.log('usedNodes: ', usedNodes.toJS());
        // usedNodes = usedNodes.update(usedNodes.lastIndexOf(), (node) => {
        //     return node.set('isEndpoint', false);
        // });

        // console.log('usedNodes: ', usedNodes.toJS());

        usedNodes = usedNodes.concat(fillUsedNodes(thisLine));

        console.log('concat usedNodes: ', usedNodes.toJS());

        // thisClickToSave = {
        //     turnStart: turnStart,
        //     turn: turn,
        //     click: clickNo,
        //     player: player,
        // };

        if(isValid){
            
            movesRemain = remainingMoves(usedNodes);

            setRemainingMoves(movesRemain);
            setUsedLines(usedLines.push(thisLine));
        }

        // if(isValid){
        //     setUsedNodes(usedNodes);
        //     setUsedClicks(usedClicks.push(Map(thisClickToSave)));
        //     setRemainingMoves(usedNodes, thisNodeToSave);
        //     setUsedLines(usedLines.push(thisLine));
        // }else{
        //     payloadOptions = {
        //         ...payloadOptions,
        //         movesRemain: true,
        //         isValid: false,
        //         player: player,
        //         thisClickNo: clickNo,
        //         turnStart: turnStart,
        //         newLine: null,
        //     };
        //     return payload(payloadOptions);
        // }

        
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
        setUsedNodes(usedNodes);
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
