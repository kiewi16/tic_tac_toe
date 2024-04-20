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
// A function that creates the objects that store each players’ information - properties should include: id (ex: 'one'), token (ex: '⭐️'), wins (ex: 0)
function createPlayers (token) {
if (token === "🌈") { 
    return {
        id: 1,
        token: token, 
        isTurn: true,
        wins: 0, 
        moves: []
} 
} else {
    return {
        id: 2,
        token: token, 
        isTurn: false,
        wins: 0, 
        moves: []
    }
}
}

// A function that keeps track of the data for the game board

function checkSquareStatus(event) {
    var selectedSquare = event.target.closest('div')
    var selectedSquareIndex = parseInt(selectedSquare.getAttribute("cellIndex")) 
    updateSquare(selectedSquare, selectedSquareIndex)
}
    
function updateSquare (selectedSquare, selectedSquareIndex) {
    var shouldSwitchTurn = false
    var shouldMakeMove = false 
    if (squareStatus[selectedSquareIndex] === "") {
      squareStatus[selectedSquareIndex] = player1.isTurn ? player1.token : player2.token
      var currentPlayerToken = squareStatus[selectedSquareIndex]
      shouldSwitchTurn = true
      shouldMakeMove = true 
      updateBoardToken(currentPlayerToken, selectedSquare)
    } else if (squareStatus[selectedSquareIndex] === "🌈" || squareStatus[selectedSquareIndex] === "🦄") {
      window.alert('Please Select Another Square!')
    }

    if (shouldMakeMove) {
      updatePlayerMoves(selectedSquareIndex)}
    
    var player = player1.isTurn ? player1 : player2
    checkWinConditions(player)
    // checkForDraw(player1, player2) //this should only run if checkWinConditions is false (aka nobody has won). If someone has won, this function checkForDraw should NOT run.

    if (shouldSwitchTurn) {
      switchPlayersTurn(player1, player2)
    }

}

function updatePlayerMoves (selectedSquareIndex) {
    if (player1.isTurn === true) {
      player1.moves.push(selectedSquareIndex)
      console.log("player1.moves:", player1.moves)
    } else {player2.moves.push(selectedSquareIndex)
      console.log("player2.moves:", player2.moves)
    }
}

// A function that keeps track of which player’s turn it currently is
// I am updating the player.moves in the makeMove function. The moves need to be updated before the checkWinConditions function is invoked, otherwise the checkWinConditions function will not be evaluating the most recent player.moves to the winConditions array. 

function switchPlayersTurn(player1, player2) {
  if (player1.isTurn === true) {
    player1.isTurn = false
    player2.isTurn = true
  } else {
    player2.isTurn = false 
    player1.isTurn = true 
  }
  updateHeader(player1.isTurn ? player1.token : player2.token)
  console.log("players:", player1, player2)
}

// A function that checks the game board data for win conditions
// This function iterates over the winConditions array and checks if any of the win conditions are met by comparing them against the moves made by each player. If win condition (i.e., all three squares are included in the player1.moves), the function currently logs a message to the console indicating which player wins. 

function checkWinConditions(player) {
    for (var i = 0; i < winConditions.length; i++) {
        var playerSquaresTowardsWinCounter = 0;
        for (var j = 0; j < player.moves.length; j++) {
            if (winConditions[i].includes(player.moves[j])) {
                playerSquaresTowardsWinCounter ++
                console.log("playerSquaresTowardsWinCounter", playerSquaresTowardsWinCounter)
            } 
        } 
        if (playerSquaresTowardsWinCounter === 3) {
            console.log(player.id === 1 ? "Player 1 Wins!" : "Player 2 Wins!")
            increaseWins(playerSquaresTowardsWinCounter, player)
            updateHeaderWithWinner(player)
            setTimeout(resetGame, 1000)
            return true 
        }
    }
    return playerSquaresTowardsWinCounter
}

// A function that detects when a game is a draw (no one has won)

function checkForDraw(player1, player2, playerSquaresTowardsWinCounter) {
    var totalBoardSquares = 9
    var totalPlayerMoves = player1.moves.length + player2.moves.length 
    if (totalPlayerMoves === totalBoardSquares){
        console.log("This Game is a Draw")
        updateHeaderWithDraw()
        setTimeout(resetGame, 1000)
        return true; 
    } else {console.log("this game is not a draw")}
}
// disableCell and remove the click event (wherever it is on event listener)

// A function called increaseWins - increases the count of a player’s wins (should work for either player)

function increaseWins (playerSquaresTowardsWinCounter, player) {
    if (playerSquaresTowardsWinCounter === 3 && player.id === 1) {
        player1.wins += 1
        console.log("player1.wins:", player1.wins)
        updatePlayerWins(player1) 
    } else if (playerSquaresTowardsWinCounter === 3 && player.id === 2) {
        player2.wins += 1
        console.log("player2.wins:", player2.wins)
        updatePlayerWins(player2)
    }
}

// A function that resets the game board’s data to begin a new game

function resetGame() {
    squareStatus = ["", "", "", "", "", "", "", "", ""];
    player1.moves = [];
    player1.isTurn = true;
    player2.moves = [];
    player2.isTurn = false; 

    for (var i = 0; i < boardSquares.length; i++) {
        boardSquares[i].innerText = ""
    }
    mainHeader.innerText = `It's 🌈's Turn`
}

// functions that update the DOM 
function updateBoardToken (currentPlayerToken, selectedSquare) {
    selectedSquare.innerText = `${currentPlayerToken}`
}

function updateHeader(currentPlayerToken) {
    mainHeader.innerText = `It's ${currentPlayerToken}'s Turn`
}

function updatePlayerWins(player) {
    var playerWins
    if (player.id === 1) { 
        playerWins = rainbowWins
    } else {
        playerWins = unicornWins
    }
    playerWins.innerText = `${player.wins} wins`
}

function updateHeaderWithWinner(player) {
    mainHeader.innerText = `${player.token} Won`
    setTimeout(() => {
        mainHeader.innerText = `${player.token} Won!`;
    }, 0)
}

function updateHeaderWithDraw() {
    mainHeader.innerText = `This Game is a Draw!`;
    setTimeout(() => {
        mainHeader.innerText = `This Game is a Draw!`;
    }, 0);
}