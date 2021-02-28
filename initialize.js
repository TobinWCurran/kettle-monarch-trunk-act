import { List } from 'immutable';

export default function initialize(){
    global.appStore = {
        _usedClicks: List(),
        _usedLines: List(),
        setCurrent: function(newCurrent) {
            this._current = newCurrent;
        },
        getCurrent: function() {
            return this._current;
        },
        getLast: function( i = 0 ) {
            return this._usedNodes.last(i);
        },
        getUsed: function(){
            return this._usedClicks;
        },
        setUsed: function(usedClicks){
            this._usedClicks = usedClicks;
        },
        getUsedLines: function() {
            return this._usedLines;
        },
        setUsedLines: function(usedLines) {
            this._usedLines = usedLines;
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

