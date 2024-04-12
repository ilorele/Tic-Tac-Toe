const gameboard = (function() {
    const gameboardArr = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ];
    const startGameBtnEl = document.querySelector('.start-game-btn');
    startGameBtnEl.addEventListener('click', function() {
        playSingleGame(playerOne, playerTwo);
    });
    const gameBoardEl = document.querySelector('.gameboard');
    
    return {gameboardArr, startGameBtnEl, gameBoardEl}
})();

function createGameboard() {
    gameboard.gameboardArr.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
            const cellEl = document.createElement('div');
            cellEl.id = `${gameboard.gameboardArr.indexOf(row)}${i}`;
            cellEl.classList.add('gameboard-cell');
            gameboard.gameBoardEl.appendChild(cellEl);
        }
    });
}

createGameboard();

const playerOne = (function() {
    const name = 'playerOne';
    const mark = 'x';
    const myTurn = true;
    const score = 0;
    const isAI = true;
    const isAIBtnEl = document.querySelector('.player1-is-AI-btn');
    const defineIfAI = isAIBtnEl.addEventListener('click', function() {
        definePlayer(playerOne);
    });

    return {name, mark, myTurn, isAI, isAIBtnEl, defineIfAI, score}
})();

const playerTwo = (function() {
    const name = 'playerTwo';
    const mark = 'o';
    const myTurn = false;
    const score = 0;
    const isAI = true;
    const isAIBtnEl = document.querySelector('.player2-is-AI-btn');
    const defineIfAI = isAIBtnEl.addEventListener('click', function() {
        definePlayer(playerTwo);
    });

    return {name, mark, myTurn, isAI, isAIBtnEl, defineIfAI, score}
})();


function definePlayer(player) {
    if (player.isAIBtnEl.textContent === 'AI') {
        player.isAIBtnEl.textContent = 'Human';
        player.isAI = false;
    } else {
        player.isAIBtnEl.textContent = 'AI';
        player.isAI = true;
    }
}

function playSingleGame(player1, player2) {
    let placesTaken = 0;
    let gameWon = false;

    pickPlayer();

    function pickPlayer() {
        if (player1.myTurn === true) {
            player1.myTurn = false;
            player2.myTurn = true;
            checkIfAI(player1);
        } else {
            player1.myTurn = true;
            player2.myTurn = false;
            checkIfAI(player2);
        }
    }

    function checkIfAI(player) {
        let newMarkPlace;

        if (player.isAI === true) {
            newMarkPlace = getComputersMarkPlace(player);
            console.log(player.name + ' is AI');

            checkIfPlaceEmpty(newMarkPlace, player);
            
        } else {
            gameboard.gameBoardEl.addEventListener('click', function getUsersMarkPlace(e) {
                const markPlaceRow = +e.target.id.charAt(0);
                const markPlaceCol = +e.target.id.charAt(1);

                newMarkPlace = {player, markPlaceRow, markPlaceCol}

                console.log(player.name + ' is human');

                gameboard.gameBoardEl.removeEventListener('click', getUsersMarkPlace);

                checkIfPlaceEmpty(newMarkPlace, player);
            });

        }
    }

    function getComputersMarkPlace(player) {
        let markPlaceRow;
        let markPlaceCol;
        markPlaceRow = Math.floor(Math.random()*3);
        markPlaceCol = Math.floor(Math.random()*3);
        return {player, markPlaceRow, markPlaceCol}
    }

    function checkIfPlaceEmpty(markPlace, player) {

        if (gameboard.gameboardArr[markPlace.markPlaceRow][markPlace.markPlaceCol] === '') {
            console.log('empty');
            gameboard.gameboardArr[markPlace.markPlaceRow][markPlace.markPlaceCol] = player.mark;
            const cellEl = document.getElementById(`${markPlace.markPlaceRow}${markPlace.markPlaceCol}`);
            cellEl.textContent = player.mark;
            placesTaken++;
            console.table(gameboard.gameboardArr);
            checkIfWon(markPlace, player.mark, player.name);
        } else {
            console.log('taken');
            checkIfAI(player);
        }
    }

    function checkIfWon(markPlace, mark, name) {
        const checkRows = (function() {
            let markCount = 0;

            for (let i = 0; i < 3; i++) {
                
                if (gameboard.gameboardArr[markPlace.markPlaceRow][i] === mark) {
                    markCount++;
                }
            }

            if (markCount === 3) {
                console.log(`GAME WON (ROWS)! ${name} WINS`);
                gameWon = true;
            } else {
                checkCols();
            }
        }());

        function checkCols() {
            let markCount = 0;

            for (let i = 0; i < 3; i++) {

                if (gameboard.gameboardArr[i][markPlace.markPlaceCol] === mark) {
                    markCount++;
                }
            }

            if (markCount === 3) {
                console.log(`GAME WON!(COLS) ${name} WINS`);
                gameWon = true;
            } else {
                checkDiagonally();
            }
        }

        function checkDiagonally() {

            if (markPlace.markPlaceRow === markPlace.markPlaceCol) {
                checkTopToBottom();
            } else {
                checkBottomToTop();
            }

            function checkTopToBottom() {
                let markCount = 0;

                for (let i = 0; i < 3; i++) {
                    
                    if(gameboard.gameboardArr[i][i] === mark) {
                        markCount++;
                    }
                }

                if (markCount === 3) {
                    console.log(`GAME WON (DIAGONALLY) ${name} WINS`);
                    gameWon = true;
                } else {
                    checkBottomToTop();
                }
            }

            function checkBottomToTop() {

                if (
                    (markPlace.markPlaceRow === 2 && markPlace.markPlaceCol === 0) || 
                    (markPlace.markPlaceRow === 1 && markPlace.markPlaceCol === 1) ||
                    (markPlace.markPlaceRow === 0 && markPlace.markPlaceCol === 2)) {
                        if (
                            gameboard.gameboardArr[2][0] === mark && 
                            gameboard.gameboardArr[1][1] === mark && 
                            gameboard.gameboardArr[0][2] === mark) {
                                console.log(`GAME WON (DIAGONALLY) ${name} WINS`);
                                gameWon = true;
                            }
                    }
            }
        }

        if (placesTaken === 9 && gameWon === false) {
            console.log('IT IS A TIE!');
        } else if (placesTaken < 9 && gameWon === false) {
            pickPlayer();
        }
    }
}