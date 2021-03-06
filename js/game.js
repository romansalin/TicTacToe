var TicTacToe = (function () {

    var SIZE = 3;

    var TURNS = {player: 'x', robot: 'o'};

    var RESULTS = {
        'lose': {code: 'lose', message: 'Вы проиграли!'},
        'win': {code: 'win', message: 'Вы выиграли!'},
        'draw': {code: 'draw', message: 'Ничья!'}
    };

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
        settings.result = $('#result');
    };

    var bindEvents = function () {
        settings.startButton.on('click', startNewGame);
        settings.gameCell.on('click', userMove);
    };

    var getCellByNumber = function (cell) {
        return settings.gameTable.find('tr:eq(' + Math.floor(cell / SIZE) + ') td:eq(' + cell % SIZE + ')');
    };

    var startNewGame = function () {
        for (var i = 0; i < SIZE * SIZE; i++) {
            gameState[i] = null;
        }

        settings.gameCell.empty();
        settings.result.empty();
        settings.gameCell.on('click', userMove);
    };

    var userMove = function () {
        var row = $(this).closest('tr').index();
        var col = $(this).index();

        var cell = row * SIZE + col;

        if (gameState.length === 0) {
            startNewGame();
        }

        if (gameState[cell] === null) {
            move(cell, TURNS.player);

            if (!isGameEnded()) {
                resolveNextMove();
                isGameEnded();
            }
        }
    };

    var move = function (cell, turn) {
        gameState[cell] = turn;
        console.log(gameState);

        var gameCell = getCellByNumber(cell);
        $(gameCell).html('<span>' + turn + '</span>');
    };

    var isGameEnded = function () {
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
                showResult(RESULTS.win, WINNING_COMBINATIONS[i]);
                return true;
            }

            if (match['lose'] === SIZE) {
                showResult(RESULTS.lose, WINNING_COMBINATIONS[i]);
                return true;
            }
        }

        for (var i = 0; i < SIZE * SIZE; i++) {
            if (gameState[i] === null) {
                return false;
            }
        }

        showResult(RESULTS.draw, null);
        return true;
    };

    var resolveNextMove = function () {
        if (!checkWinLoseChance()) {
            var cellCenter = 4;
            var cellCorner = $.grep([0, 2, 6, 8], function (cell) {
                return gameState[cell] === null;
            }).randomElement();
            var cellOther = $.grep([1, 3, 5, 7], function (cell) {
                return gameState[cell] === null;
            }).randomElement();

            if (gameState[cellCenter] === null) {
                move(cellCenter, TURNS.robot);
            } else if (cellCorner != null) {
                move(cellCorner, TURNS.robot);
            } else {
                move(cellOther, TURNS.robot);
            }
        }
    };

    var checkWinLoseChance = function () {
        // Where can I make a move to win?
        var loseCells = [];
        // Where can my opponent makes a move to win?
        var winCells = [];
        
        for (var i = 0; i < WINNING_COMBINATIONS.length; i++) {
            var match = {win: 0, lose: 0, emptyCell: null};

            for (var j = 0; j < WINNING_COMBINATIONS[i].length; j++) {
                if (gameState[WINNING_COMBINATIONS[i][j]] === TURNS.player) {
                    match.win++;
                }

                if (gameState[WINNING_COMBINATIONS[i][j]] === TURNS.robot) {
                    match.lose++;
                }

                if (gameState[WINNING_COMBINATIONS[i][j]] === null) {
                    match.emptyCell = j;
                }
            }

            if (match.lose === SIZE - 1 && match.emptyCell != null) {
                loseCells.push(WINNING_COMBINATIONS[i][match.emptyCell]);
            }

            if (match.win === SIZE - 1 && match.emptyCell != null) {
                winCells.push(WINNING_COMBINATIONS[i][match.emptyCell]);
            }
        }

        var winCell = winCells.randomElement();
        if (loseCells[0] != null) {
            move(loseCells[0], TURNS.robot);
            return true;
        } else if (winCell != null) {
            move(winCell, TURNS.robot);
            return true;
        }
        
        return false;
    };

    var showResult = function (result, winningCombination) {

        settings.gameCell.off('click');

        if (winningCombination !== null && (result.code == 'win' || result.code == 'lose')) {
            for (var i = 0; i < winningCombination.length; i++) {
                var gameCell = getCellByNumber(winningCombination[i]);
                $(gameCell).find('span').addClass(result.code);
            }
        }

        settings.result.append(result.message);
    };

    return {
        init: init
    }

})();

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

$(function () {
    TicTacToe.init();
});
