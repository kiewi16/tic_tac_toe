// global variables
var player1 = createPlayers("🌈")
var player2 = createPlayers("🦄")
var squareStatus = ["", "", "", "", "", "", "", "", ""]
var winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// query selectors 
var boardSquares = document.querySelectorAll('.square')
var mainHeader = document.querySelector('h2')
var rainbowWins = document.querySelector('.rainbow-wins')
var unicornWins = document.querySelector('.unicorn-wins')

// event listeners
for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener('click', checkSquareStatus)
}
window.addEventListener('load', createPlayers)

// functions
function createPlayers(token) {
if (token === "🌈") { 
    return {
        id: 1,
        token: token, 
        isTurn: true,
        wins: 0, 
        moves: [],
        isFirstPlayer: true, 
    } 
} else {
    return {
        id: 2,
        token: token, 
        isTurn: false,
        wins: 0, 
        moves: [],
        isFirstPlayer: false, 
    }
}
}

function checkSquareStatus(event) {
    var selectedSquare = event.target.closest('div');
    var selectedSquareIndex = parseInt(selectedSquare.getAttribute("cellIndex"));
    updateSquare(selectedSquare, selectedSquareIndex);
}
    
function updateSquare(selectedSquare, selectedSquareIndex) {
    var shouldSwitchTurn = false;
    var shouldMakeMove = false;

    if (squareStatus[selectedSquareIndex] === "") {
        squareStatus[selectedSquareIndex] = player1.isTurn ? player1.token : player2.token;
        var currentPlayerToken = squareStatus[selectedSquareIndex];
        shouldSwitchTurn = true;
        shouldMakeMove = true; 
        updateBoardToken(currentPlayerToken, selectedSquare); 
    } else if (squareStatus[selectedSquareIndex] === "🌈" || squareStatus[selectedSquareIndex] === "🦄") {
      window.alert('Please Select Another Square!');
    }

    if (shouldMakeMove) {
        updatePlayerMoves(selectedSquareIndex);
    }
    
    var player = player1.isTurn ? player1 : player2;
    var winResult = checkWinConditions(player);
  
    if (winResult === false) {
        checkForDraw(player1, player2);
    } 

    if (shouldSwitchTurn && winResult === false) {
        switchPlayersTurn(player1, player2);
    } 
}

function updatePlayerMoves(selectedSquareIndex) {
    if (player1.isTurn) {
        player1.moves.push(selectedSquareIndex);
    } else {player2.moves.push(selectedSquareIndex);
    }
}

function switchPlayersTurn(player1, player2) {
  if (player1.isTurn) {
    player1.isTurn = false;
    player2.isTurn = true;
  } else {
    player2.isTurn = false; 
    player1.isTurn = true; 
  }
  updateHeader(player1.isTurn ? player1.token : player2.token);
}

function checkWinConditions(player) {
    for (var i = 0; i < winConditions.length; i++) {
        var playerSquaresTowardsWinCounter = 0;
        for (var j = 0; j < player.moves.length; j++) {
            if (winConditions[i].includes(player.moves[j])) {
                playerSquaresTowardsWinCounter++;
            } 
        } 
        if (playerSquaresTowardsWinCounter === 3) {
            increaseWins(playerSquaresTowardsWinCounter, player);
            updateHeaderWithWinner(player);
            disableClicks(); 
            setTimeout(resetGame, 1000); 
            return true; 
        }
    }
    return false; 
}

function checkForDraw(player1, player2) {
    var totalBoardSquares = 9;
    var totalPlayerMoves = player1.moves.length + player2.moves.length;

    if (totalPlayerMoves === totalBoardSquares) {
        updateHeaderWithDraw();
        disableClicks(); 
        setTimeout(resetGame, 1000);
        return true;
    } else {
        console.log("this game is not a draw");
    } 
}

function increaseWins(playerSquaresTowardsWinCounter, player) {
    if (playerSquaresTowardsWinCounter === 3 && player.id === 1) {
        player1.wins += 1; 
        updatePlayerWins(player1);
    } else if (playerSquaresTowardsWinCounter === 3 && player.id === 2) {
        player2.wins += 1;
        updatePlayerWins(player2); 
    }
}

function disableClicks() {
    for(var i = 0; i < boardSquares.length; i++) {
        boardSquares[i].removeEventListener('click', checkSquareStatus);
    }
}

function resetGame() {
    squareStatus = ["", "", "", "", "", "", "", "", ""];
    player1.moves = [];
    player2.moves = [];
    
    for (var i = 0; i < boardSquares.length; i++) {
        boardSquares[i].innerText = "";
    }
    
    if (player1.isFirstPlayer) {
        player1.isFirstPlayer = false; 
        player1.isTurn = false; 
        player2.isFirstPlayer = true;
        player2.isTurn = true; 
        mainHeader.innerText = `🦄 Plays First!`;
    } else {
        player1.isFirstPlayer = true; 
        player1.isTurn = true; 
        player2.isFirstPlayer = false;
        player2.isTurn = false; 
        mainHeader.innerText = `🌈 Plays First!`;
    }
    
    for (var i = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener('click', checkSquareStatus)
    }
}

// functions that update the DOM 
function updateBoardToken(currentPlayerToken, selectedSquare) {
    selectedSquare.innerText = `${currentPlayerToken}`;
}

function updateHeader(currentPlayerToken) {
    mainHeader.innerText = `It's ${currentPlayerToken}'s Turn`;
}

function updatePlayerWins(player) {
    var playerWins;
    if (player.id === 1) { 
        playerWins = rainbowWins;
    } else {
        playerWins = unicornWins;
    }
    playerWins.innerText = `${player.wins} wins`;
}

function updateHeaderWithWinner(player) {
    mainHeader.innerText = `${player.token} Wins`;
    setTimeout(() => {
        mainHeader.innerText = `${player.token} Wins!`;
    }, 0);
}

function updateHeaderWithDraw() {
    mainHeader.innerText = `This Game is a Draw!`;
    setTimeout(() => {
        mainHeader.innerText = `This Game is a Draw!`;
    }, 0);
}