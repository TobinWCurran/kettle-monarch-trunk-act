import { Map } from 'immutable';

import {
    isUsed as used,
    nodesMatch as match,
    usedIndex as index,
} from './usedHelpers.js';

import validateNode from './validateNode.js';

function nodeClicked(req){
    const { body: thisNode } = req;

    const getUsed = appStore.getUsed.bind(appStore);
    const setUsed = appStore.setUsed.bind(appStore);

    let usedClicks = getUsed();

    const isFirstClick = Boolean(usedClicks.size === 0);

    const isUsed = isFirstClick ? false : used(usedClicks, thisNode);
    const usedIndex = isFirstClick ? -1 : index(usedClicks, thisNode);

    isUsed && console.log(usedClicks.get(usedIndex).toJS());

    const usedTest = isUsed && usedClicks.get(usedIndex).get('node');

    

    if(isUsed && match(usedTest, thisNode)){
        usedClicks = usedClicks.update(usedIndex, (i) => {
            return i.set('isEndpoint', false);
        });
    }

    const lastClick = isFirstClick ? null : usedClicks.last();
    
    const thisClickNo = isFirstClick ? 1 : lastClick.get('click') + 1;

    const player = isFirstClick ? 1 : lastClick.get('player');

    const thisTurn = thisClickNo%2 === 0 ? player + 1 : player;
    const thisPlayer = thisTurn%2 === 0 ? 2 : 1;
    const turnStart = thisClickNo%2 === 0 ? false : true;

    function isEndpoint(){
        if(isFirstClick){
            return true;
        }
        if(turnStart){
            return false;
        }
        return true;
    }

    const thisClick = Map({
        // turn: thisTurn,
        player: thisPlayer,
        turnStart: turnStart,
        click: thisClickNo,
        node: req.body,
        isEndpoint: isEndpoint(),
    });

    const isValid = validateNode(thisClick, lastClick);

    function resMessage() {
        const messages = {
            VALID_START_NODE: 'VALID_START_NODE',
            INVALID_START_NODE: 'INVALID_START_NODE',
            VALID_END_NODE: 'VALID_END_NODE',
            INVALID_END_NODE: 'INVALID_END_NODE',
            GAME_OVER: 'INVALID_END_NODE',
            STATE_UPDATE: 'STATE_UPDATE',
        };
        if(thisClickNo === 1){
            return messages.VALID_START_NODE;
        }
        if(turnStart && isValid){
            return messages.VALID_START_NODE;
        }

        if(turnStart && !isValid){
            return messages.INVALID_START_NODE;
        }

        if(!turnStart && isValid){
            return messages.VALID_END_NODE;
        }

        if(!turnStart && !isValid){
            messages.INVALID_END_NODE;
        }
        return messages.STATE_UPDATE;
    }

    function resBody() {

        const PLAYER1 = 'Player 1';
        const PLAYER2 = 'Player 2';
        let message = '';
        
        // console.log('thisTurn: ', thisTurn);
        // console.log('player: ', thisPlayer);

        const playerNo = thisPlayer === 1 ? PLAYER1 : PLAYER2;

        function line() {
            if(thisClickNo === 1){
                return null;
            }

            if(!isValid){
                return null;
            }

            if(turnStart){
                return null;
            }

            const startPoint = lastClick.get('node');
    
            const endPoint = thisClick.get('node');

            return {
                start: startPoint,
                end: endPoint,
            };
        }

        if(thisClickNo === 1){
            message = `${playerNo} finish your turn.`;
        }
        else if(turnStart && isValid){
            message = `${playerNo} end your turn.`;
        }

        else if(turnStart && !isValid){
            message = `That is an invalid start, ${playerNo}`;
        }

        else if(!turnStart && isValid){
            message = `${playerNo} start your turn.`;
        }

        else if(!turnStart && !isValid){
            message = `That is an invalid end, ${playerNo}`;
        }

        const stateUpdate = {
            newLine: line(),
            heading: playerNo,
            message: message,
        };
        return stateUpdate;
    }

    function payLoad() {
        return {
            msg: resMessage(),
            body: resBody(),
        };
    }

    // handleClick();

    if(isValid){
        // const cleanUsedClicks = thisClickNo >= 4 ? clearEndpoint(usedClicks) : usedClicks;
        setUsed(usedClicks.push(thisClick));
    }

    return payLoad();
}

export default nodeClicked;
