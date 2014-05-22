var TicTacToe = (function () {

    var gameType = {user: 'x', robot: 'o'};

    var gameMatrix = [[],[],[]];

    var settings = {};

    var init = function () {
        getSelections();
        bindEvents();
    };

    var getSelections = function () {
        settings.startNewGameButton = $('#game-new');
        settings.gameTable = $('#game');
        settings.gameCell = settings.gameTable.find('td');
    };

    var bindEvents = function () {
        settings.startNewGameButton.on('click', startNewGame);
        settings.gameCell.on('click', userMove);
    };

    var startNewGame = function () {
        gameMatrix = [[],[],[]];

        settings.gameCell.find('span').remove();
    };

    var userMove = function () {
        move(this, gameType.user);
        resolveRobotMove();
    };

    var move = function (cell, gameType) {
        var row = $(cell).closest('tr').index();
        var col = $(cell).index();

        if (gameMatrix[row][col] == null) {
            gameMatrix[row][col] = gameType;

            $(cell).html('<span>' + gameType + '</span>');

            console.log(gameMatrix);
        }
    };

    var resolveRobotMove = function () {
        var row = 1;
        var col = 2;

        var chain = [];

        //TODO
        for (var i = 0; i < gameMatrix.length; i++) {
            chain[i] = 0;

            for (var j = 0; j < gameMatrix.length; j++) {
                if (gameMatrix[i][j] == gameType.user) {
                    chain[i]++;
                }
            }

            if (chain[i] == 3) {
                showResult(true);
            } else if (chain[i] == 2)
        }

        var cell = settings.gameTable.find('tr:eq(' + row + ') td:eq(' + col + ')');

        move(cell, gameType.robot);
    };

    var showResult = function (isWin) {
        isWin ? alert('Вы выиграли!') : alert('Вы проиграли!');
    };

    return {
        init: init
    }

})();


$(function () {
    TicTacToe.init();
});
