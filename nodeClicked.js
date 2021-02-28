import { Map } from 'immutable';

import {
    nodesMatch as match,
} from './usedHelpers.js';

import {
    setClickNo,
    setIsEndpoint,
    setIsUsed,
    setLastClick,
    setPlayer,
    setThisPlayer,
    setThisTurn,
    setTurnStart,
    setUsedIndex,
} from './nodeClickedSetters.js';

import payload from './payload.js';
import validateNode from './validateNode.js';

function nodeClicked(req){
    const { body: thisNode } = req;
    const getUsed = appStore.getUsed.bind(appStore);
    const setUsed = appStore.setUsed.bind(appStore);
    
    let usedClicks = getUsed();

    const isFirstClick = Boolean(usedClicks.size === 0);
    const isUsed = setIsUsed(isFirstClick, usedClicks, thisNode);
    
    const lastClick = setLastClick(isFirstClick, usedClicks);
    const thisClickNo = setClickNo(isFirstClick, lastClick);
    const player = setPlayer(isFirstClick, lastClick);
    const thisTurn = setThisTurn(thisClickNo, player);
    const thisPlayer = setThisPlayer(thisTurn);
    const turnStart = setTurnStart(thisClickNo);

    const usedIndex = setUsedIndex(isFirstClick, usedClicks, thisNode);
    const usedTest = isUsed && usedClicks.get(usedIndex).get('node');

    if(isUsed && match(usedTest, thisNode)){
        usedClicks = usedClicks.update(usedIndex, (i) => {
            return i.set('isEndpoint', false);
        });
    }

    // function isEndpoint(isFirstClick, turnStart){
    //     if(isFirstClick){
    //         return true;
    //     }
    //     if(turnStart){
    //         return false;
    //     }
    //     return true;
    // }

    const thisClick = Map({
        player: thisPlayer,
        turnStart: turnStart,
        click: thisClickNo,
        node: req.body,
        isEndpoint: setIsEndpoint(isFirstClick, turnStart),
    });

    const isValid = validateNode(thisClick, lastClick);

    if(isValid){
        setUsed(usedClicks.push(thisClick));
    }

    return payload(isValid, lastClick, thisPlayer, thisClick, thisClickNo, turnStart);
}

export default nodeClicked;
