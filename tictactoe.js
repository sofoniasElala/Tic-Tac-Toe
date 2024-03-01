const tictactoe = (function () {
    let currentPlayer; 
    let playerOne;
    let playerTwo;
    const gameBoard = {
        board: [],
        reset: function() {
            this.board = [];
        }
    }
    

    function player(name, marker){
        let positions = [];

        return {name, marker, positions}
    }

    function placeMarker(pos){
        gameBoard.board[pos] = currentPlayer.marker;
        currentPlayer.positions.push(pos);
        print();
        checkForWinner();
        changeCurrentPlayer();

    }

    function start(){
        playerOne = player('player one', 'X');
        playerTwo = player('player two', 'O');
        currentPlayer = playerOne;
    }

    function changeCurrentPlayer(){
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; 
        console.log(`${currentPlayer.name}\'s turn: ${currentPlayer.marker}`);
    }

    function checkForWinner(){
        let winningCombinations = [[0,1,2], [3,4,5], [2,5,8], [6,7,8], [1,4,7], [0,3,6], [2,4,6], [0,4,8]]
        if(currentPlayer.positions.length >= 3){
            for(let nums of winningCombinations){
                if(nums.every(num =>  currentPlayer.positions.includes(num))) {
                    console.log(`You Won ${currentPlayer.name}!`);

                }
            }
        }
    }

    function resetGame(){
        gameBoard.reset();
        playerOne, playerTwo = {};
        currentPlayer = playerOne;
    }

    function print(){
        console.log('player one: ' + playerOne.positions);
        console.log('player two: ' + playerTwo.positions);
        console.log(gameBoard.board);
    }

    start();
    console.log('Welcome to TIC TAC TOE')
    return { placeMarker}


})();