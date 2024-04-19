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

// var board = document.querySelector('.tic-tac-toe-board')
var boardSquares = document.querySelectorAll('.square')
var mainHeader = document.querySelector('h2')
var rainbowWins = document.querySelector('.rainbow-wins')
var unicornWins = document.querySelector('.unicorn-wins')

// event listeners

// added eventListener to the <section> element, which is the parent element that contains the board squares. 
// boardSquares = addEventListener ('click', checkSquareStatus)
for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener('click', checkSquareStatus)
}

window.addEventListener('load', createPlayers)

// functions

// A function that creates the objects that store each players’ information - properties should include: id (ex: 'one'), token (ex: '⭐️'), wins (ex: 0)

// add parameter which is the name of the player, basd on the name of the player that I am passing as an argument to my function invocation, I will return the player object. 

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
        isTurn: true,
        wins: 0, 
        moves: []
    }
}
}

// the first if statement gets the value of the clicked div's(square) cellIndex attribute (0 to 8).
// the value of the attribute (0 to 8) is stored to the selectedSquareIndex variable. 
// the value stored to the selectedSquare Index variable is not an integer because the value is not being converted to an integer. In JavaScript, when you retrieve values from HTML attributes using methods like getAttribute, the values are returned as strings. This is because HTML attributes are inherently string-based. Adding the "+" before the (selectedSquare.getAttribute("cellIndex")) converts the value to an integer. 

// squareStatus is the array that represents the status of each square in the board.
// selectedSquareIndex holds the index value of the square that was clicked on.
// squareStatus[selectedSquareIndex] accesses the element in the squareStatus array at the position specified by the selectedSquareIndex. For example, if selectedSquareIndex is 0, then it would access the first element in the squareStatus array.
// the if statement checks to see if the element in the squareStatus array selected by squareStatus[selectedSquareIndex] is empty (""). If it is empty (""), then the data model will be updated with an emoji based on which player's turn it is. 

// A function that keeps track of the data for the game board

function checkSquareStatus(event) {
    var selectedSquare = event.target.closest('div')
    var selectedSquareIndex = parseInt(selectedSquare.getAttribute("cellIndex")) 
    updateBoard (selectedSquare, selectedSquareIndex)
}
    
function updateBoard (selectedSquare, selectedSquareIndex) {
    var shouldSwitchTurn = false
    var shouldMakeMove = false 
    if (squareStatus[selectedSquareIndex] === "") {
      squareStatus[selectedSquareIndex] = player1.isTurn ? player1.token : player2.token
      shouldSwitchTurn = true
      shouldMakeMove = true 
      var currentPlayerToken = squareStatus[selectedSquareIndex]
      console.log("squareStatus[selectedSquareIndex]:", squareStatus[selectedSquareIndex])
      updateBoardToken (currentPlayerToken, selectedSquare)
    } else if (squareStatus[selectedSquareIndex] === "🌈" || squareStatus[selectedSquareIndex] === "🦄") {
      window.alert('Please Select Another Square!')
    }
    if (shouldMakeMove) {makeMove(selectedSquareIndex)}
    var player = player1.isTurn ? player1 : player2
    checkWinConditions(player)
    checkForDraw(player1, player2)
    if (shouldSwitchTurn) {
        switchPlayersTurn(player1, player2)
        updateHeader(player1.isTurn ? player1.token : player2.token)
    }
}

function makeMove (selectedSquareIndex) {
    if (player1.isTurn === true) {
      player1.moves.push(selectedSquareIndex)
      console.log("player1.moves:", player1.moves)
    } else {player2.moves.push(selectedSquareIndex)
      console.log("player2.moves:", player2.moves)
    }
}

// A function that keeps track of which player’s turn it currently is
// selectedSquareIndex is the parameter
// I am updating the player.moves in the makeMove function. The moves need to be updated before the checkWinConditions function is invoked, otherwise the checkWinConditions function will not be evaluating the most recent player.moves to the winConditions array. 

function switchPlayersTurn(player1, player2) {
  if (player1.isTurn === true) {
    player1.isTurn = false
    player2.isTurn = true
   
  } else {
    player2.isTurn = false 
    player1.isTurn = true 
  }
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
            window.setTimeout(resetGame, 15000)
            return
        }
    }
}

// A function that detects when a game is a draw (no one has won)

function checkForDraw(player1, player2) {
    var totalBoardSquares = 9
    var totalPlayerMoves = player1.moves.length + player2.moves.length 
    if (totalPlayerMoves === totalBoardSquares && player1.wins === 0 && player2.wins === 0) {
        updateHeaderWithDraw()
        window.setTimeout(resetGame, 15000)
        console.log("This Game is a Draw")
    }
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
    // setTimeout(console.log("does this work"), 15000)
    squareStatus = ["", "", "", "", "", "", "", "", ""];
    player1.moves = [];
    player1.isTurn = true;
    player2.moves = [];
    player2.isTurn = false; 

    for (var i = 0; i < boardSquares.length; i++) {
        boardSquares[i].innerText = ""
    }
}


// functions that update the DOM 
function updateBoardToken (currentPlayerToken, selectedSquare) {
    selectedSquare.innerText = currentPlayerToken
}

function updateHeader(currentPlayerToken) {
    mainHeader.innerText = `It's ${currentPlayerToken}'s Turn`
}

function updateHeaderWithWinner(player) {
    mainHeader.innerText = `${player.token} Won`
    console.log("player:", player)
}

function updateHeaderWithDraw() {
    mainHeader.innerHTML = `<h2>This Game is a Draw!</h2>`
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