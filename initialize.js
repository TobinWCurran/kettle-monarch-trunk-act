import { List, Map } from 'immutable';

export default function initialize(){
    console.log('*************** INITIALIZE ****************');
    const allNodes = List([
        Map({x: 0, y: 0}),
        Map({x: 0, y: 1}),
        Map({x: 0, y: 2}),
        Map({x: 0, y: 3}),
    
        Map({x: 1, y: 0}),
        Map({x: 1, y: 1}),
        Map({x: 1, y: 2}),
        Map({x: 1, y: 3}),
    
        Map({x: 2, y: 0}),
        Map({x: 2, y: 1}),
        Map({x: 2, y: 2}),
        Map({x: 2, y: 3}),
    
        Map({x: 3, y: 0}),
        Map({x: 3, y: 1}),
        Map({x: 3, y: 2}),
        Map({x: 3, y: 3}),
    ]);

    global.appStore = {
        _allNodes: allNodes,
        _usedClicks: List(),
        _usedLines: List(),
        _usedNodes: List(),
        _remainingMoves: List(),
        getAllNodes: function(){
            return this._allNodes;
        },
        getUsedClicks: function(){
            return this._usedClicks;
        },
        setUsedClicks: function(usedClicks){
            this._usedClicks = usedClicks;
        },
        getUsedNodes: function(){
            return this._usedNodes;
        },
        setUsedNodes: function(usedNodes){
            this._usedNodes = usedNodes;
        },
        getUsedLines: function() {
            return this._usedLines;
        },
        setUsedLines: function(usedLines) {
            this._usedLines = usedLines;
        },
        getRemainingMoves: function(){
            return this._remainingMoves;
        },
        setRemainingMoves: function(remainingMoves){
            this._remainingMoves = remainingMoves;
        },
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

