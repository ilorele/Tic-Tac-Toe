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
    const myTurn = false;
    const score = 0;
    return {name, mark, myTurn, score}
})();

const playerTwo = (function() {
    const name = 'playerTwo';
    const mark = 'o';
    const myTurn = true;
    const score = 0;
    return {name, mark, myTurn, score}
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
            const markPlaceRow = Math.floor(Math.random()*3);
            const markPlaceCol = Math.floor(Math.random()*3);

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
                checkIfWon(markPlace, player.mark, player.name);
            } else {
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
                }
            }
        };
    }
}

playSingleGame(playerOne, playerTwo);
