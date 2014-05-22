var TicTacToe = (function () {

    var gameMatix = [
        [],
        [],
        []
    ];

    var settings = {

    };

    var bindEvents = function () {
        console.log('test');
    };

    var init = function () {
        bindEvents();
    };

    return {
        init: init
    }

})();

$(function () {
    TicTacToe.init();
});
