import { List, Map } from 'immutable';

import validateNode from './validateNode.js';

export default function initialize(){
    global.appStore = {
        // _current: Map({
        //     click: 0,
        //     turn: 1,
        //     node: null,
        // }),
        _usedClicks: List(),
        // currentMove: function(req) {
        //     this._usedNodes = this._usedNodes.push(this._current);

        //     this._current = this._handleMove(req);
            
        //     return this._current;
        // },
        // _handleMove: function(req){
        //     const thisCLick = this._current.get('click') + 1;
        //     const turn = this._current.get('turn');
        //     const thisTurn = thisCLick%2 === 0 ? turn + 1 : turn;
        //     return Map({
        //         turn: thisTurn,
        //         click: thisCLick,
        //         node: req.body,
        //     });
        // },
        setCurrent: function(newCurrent) {
            this._current = newCurrent;
        },
        getCurrent: function() {
            return this._current;
        },
        getLast: function( i = 0 ) {
            return this._usedNodes.last(i);
        },
        
        // setLast: function(){

        // },

        getUsed: function(){
            return this._usedClicks;
        },
        setUsed: function(usedClicks){
            this._usedClicks = usedClicks;
        }
    };

    return {
        msg: 'INITIALIZE',
        body: {
            newLine: null,
            heading: 'Player 1',
            message: 'Awaiting Player 1\'s Move',
        }
    };
}

