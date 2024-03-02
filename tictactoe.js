const tictactoe = (function () {

    const game = {
        playerOne: {},
        playerTwo: {},
        currentPlayer: this.playerOne,
        currentPlayerDisplay: document.querySelector('.current-player'),
        checkForWinner: function() {
                let winningCombinations = [[0,1,2], [3,4,5], [2,5,8], [6,7,8], [1,4,7], [0,3,6], [2,4,6], [0,4,8]]
                if(this.currentPlayer.positions.length >= 3){
                    for(let nums of winningCombinations){
                        if(nums.every(num =>  this.currentPlayer.positions.includes(num))) {
                            console.log(`You Won ${this.currentPlayer.name}!`);
                        } else if(this.playerOne.positions.length + this.playerTwo.positions.length == 9){
                            console.log(`Draw!`);
                        }
                    }
                }
             },
        changeCurrentPlayer: function() {
            this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne; 
            this.currentPlayerDisplay.textContent = `${this.currentPlayer.name}\'s turn`;
            console.log(`${this.currentPlayer.name}\'s turn: ${this.currentPlayer.marker}`);
        }
    }


    const gameBoard = {
        board: [],
        reset: function() {
            this.board = [];
        }
    }

    const display = {
        boxes: Array.from(document.getElementsByClassName('box')),
       addToDisplay: function(box, marker){
        box.textContent = marker;
       },
       addListener: function(){
         this.boxes.forEach(box => {
            box.addEventListener('click', ()=> {
                this.addToDisplay(box, game.currentPlayer.marker);
                box.style.pointerEvents = 'none';
                placeMarker(+box.dataset.id);
            })
         })
       },
       enableBoxes: function (){
            this.boxes.forEach(box => box.style.pointerEvents = 'auto');
       }
    }
    

    function player(name, marker){
        let positions = [];

        return {name, marker, positions}
    }

    function placeMarker(pos){
        gameBoard.board[pos] = game.currentPlayer.marker;
        game.currentPlayer.positions.push(pos);
        print();
        game.checkForWinner();
        game.changeCurrentPlayer();

    }

    function start(one, two){
        game.playerOne = player(one, 'X');
        game.playerTwo = player(two, 'O');
        game.currentPlayer = game.playerOne;
    }


    function resetGame(){
       display.enableBoxes();
        start();
    }

    function getNames(){
        const dialog = document.querySelector('.players-info');
        dialog.addEventListener('close', () => {
            start(document.getElementById('one').value !== '' ? document.getElementById('one').value : 'player one' ,
             document.getElementById('two').value !== '' ? document.getElementById('two').value : 'player two');
             game.currentPlayerDisplay.textContent = `${game.currentPlayer.name}\'s turn`;
        })
        dialog.showModal();
    }

    function print(){
        console.log('player one: ' + game.playerOne.positions);
        console.log('player two: ' + game.playerTwo.positions);
        console.log(gameBoard.board);
    }

    getNames();
    display.addListener();
    console.log('Welcome to TIC TAC TOE')
    /*return { placeMarker}*/


})();