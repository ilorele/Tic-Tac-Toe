const gameboard = (function() {
    const gameboardArr = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ]
    return {gameboardArr}
})();

const playerOne = (function() {
    const name = 'playerOne';
    const mark = 'x';
    const myTurn = true;
    const score = 0;
    const isAI = true;
    return {name, mark, myTurn, isAI, score}
})();

const playerTwo = (function() {
    const name = 'playerTwo';
    const mark = 'o';
    const myTurn = false;
    const isAI = true;
    const score = 0;
    return {name, mark, myTurn, isAI, score}
})();

function playSingleGame(player1, player2) {

    let placesTaken = 0;
    let gameWon = false;

    const startGame = (function() {

        for (let i = 0; i < 9; i++) {

            
            if (gameWon === true) {
                console.log('GAME OVER');
                break;
            }
            else if (player1.myTurn === true) {
                playSingleTurn(player1);
                player1.myTurn = false;
                player2.myTurn = true;
            } else {
                playSingleTurn(player2);
                player1.myTurn = true;
                player2.myTurn = false;
            }

            if (placesTaken === 9 && gameWon === false) {
                console.log("IT'S A TIE!");
            }
        }
    })();

    function playSingleTurn(player) {

        const getNewMarkPlace = function() {
            let markPlaceRow;
            let markPlaceCol;

            if (player.isAI === true) {
                markPlaceRow = Math.floor(Math.random()*3);
                markPlaceCol = Math.floor(Math.random()*3);
            } else {
                markPlaceRow = +(prompt('Please enter row number [0-2]'));
                markPlaceCol = +(prompt('Please enter column number [0-2]'));
            }

            return {player, markPlaceRow, markPlaceCol}
        }

       const placeNewMark = (function() {
        const newMarkPlace = getNewMarkPlace();
        checkIfPlaceEmpty(newMarkPlace);
       })();
        
        function checkIfPlaceEmpty(markPlace) {

            if (gameboard.gameboardArr[markPlace.markPlaceRow][markPlace.markPlaceCol] === '') {
                console.log('empty');
                gameboard.gameboardArr[markPlace.markPlaceRow][markPlace.markPlaceCol] = player.mark;
                placesTaken++;
                console.table(gameboard.gameboardArr);
                checkIfWon(markPlace, player.mark, player.name);
            } else {
                if (player.isAI === false) {
                    alert('This place is taken, please select another place');
                }
                console.log('taken');
                markPlace = getNewMarkPlace();
                checkIfPlaceEmpty(markPlace);
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
        }
    }
}

function definePlayers() {
    const definePlayerOne = prompt("Is playerOne AI? [true/false]");
    playerOne.isAI = definePlayerOne === 'true';
    const definePlayerTwo = prompt("Is playerTwo AI? [true/false]");
    playerTwo.isAI = definePlayerTwo === 'true';
}

definePlayers();

playSingleGame(playerOne, playerTwo);
