var TicTacToe = (function () {

    var TURNS = {player: 'x', robot: 'o'};

    var SIZE = 3;

    var WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    var gameState = [];

    var settings = {};

    var init = function () {
        getSelections();
        bindEvents();
    };

    var getSelections = function () {
        settings.startButton = $('#start');
        settings.gameTable = $('#board');
        settings.gameCell = settings.gameTable.find('td');
    };

    var bindEvents = function () {
        settings.startButton.on('click', startNewGame);
        settings.gameCell.on('click', userMove);
    };

    var startNewGame = function () {
        for (var i = 0; i < SIZE * SIZE; i++) {
            gameState[i] = null;
        }

        settings.gameCell.find('span').remove();
    };

    var userMove = function () {
        var row = $(this).closest('tr').index();
        var col = $(this).index();

        var cell = row * SIZE + col;

        if (gameState.length === 0) {
            startNewGame();
        }

        move(cell, TURNS.player);
        resolveRobotMove();
    };

    var move = function (cell, turn) {

        if (gameState[cell] === null) {
            gameState[cell] = turn;

            console.log(gameState);

            var gameCell = settings.gameTable.find('tr:eq(' + Math.floor(cell / SIZE) + ') td:eq(' + cell % SIZE + ')');
            $(gameCell).html('<span>' + turn + '</span>');
        }
    };

    var resolveRobotMove = function () {
        var winner = checkGameEnd();
        if (winner) {
            return;
        }

        //TODO



        var cell = 8;

        move(cell, TURNS.robot);
    };

    var checkGameEnd = function () {
        for (var i = 0; i < WINNING_COMBINATIONS.length; i++) {
            var match = {win: 0, lose: 0};

            for (var j = 0; j < WINNING_COMBINATIONS[i].length; j++) {
                if (gameState[WINNING_COMBINATIONS[i][j]] === TURNS.player) {
                    match.win++;
                }

                if (gameState[WINNING_COMBINATIONS[i][j]] === TURNS.robot) {
                    match.lose++;
                }
            }

            if (match['win'] === SIZE) {
                showResult(1, WINNING_COMBINATIONS[i]);

                return true;
            }

            if (match['lose'] === SIZE) {
                showResult(-1, WINNING_COMBINATIONS[i]);

                return true;
            }
        }

        for (var i = 0; i < SIZE * SIZE; i++) {
            if (gameState[i] === null) {

                return false;
            }
        }

        return 0;
    };

    var showResult = function (result, cells) {
        var message;
        var cellClass;

        switch (result) {
            case -1:
                cellClass = 'lose';
                message = 'Вы проиграли!';
                break;
            case 0:
                message = 'Ничья!';
                break;
            case 1:
                cellClass = 'win';
                message = 'Вы выиграли!';
                break;
        }

        if (typeof cellClass !== 'undefined') {
            for (var i = 0; i < cells.length; i++) {
                var gameCell = settings.gameTable.find('tr:eq(' + Math.floor(cells[i] / SIZE) + ') td:eq(' + cells[i] % SIZE + ')');
                $(gameCell).find('span').addClass('win');
            }
        }

        message += ' Хотите сыграть еще?';

        var y = confirm(message);
        if (y == true) {
            location.reload(true);
        }
    };

    return {
        init: init
    }

})();


$(function () {
    TicTacToe.init();
});
