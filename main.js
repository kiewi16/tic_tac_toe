// global variables
var player1 = {}
var player2 = {}
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

var board = document.querySelectorAll('.tic-tac-toe-board')

// the squareStatus is part of data model that needs to be updated as the game is played. 
var squareStatus = ["", "", "", "", "", "", "", "", ""]

// event listeners

// added eventListener to the <section> element, which is the parent element that contains the board squares. 
board = addEventListener ('click', checkSquareStatus)
window.addEventListener("load", createPlayers)

// functions

// A function that creates the objects that store each players’ information - properties should include: id (ex: 'one'), token (ex: '⭐️'), wins (ex: 0)

function createPlayers () {
  player1 = {
    id: 1,
    token: "🌈", 
    isTurn: true,
    wins: 0, 
    moves: []
}; 
  player2 = {
    id: 2,
    token: "🦄",
    isTurn: false,
    wins: 0, 
    moves: []
  }
}

// the first if statement gets the value of the clicked div's(square) cellIndex attribute (0 to 8).
// the value of the attribute (0 to 8) is stored to the selectedSquareIndex variable. 
// the value stored to the selectedSquare Index variable is not an integer because the value is not being converted to an integer. In JavaScript, when you retrieve values from HTML attributes using methods like getAttribute, the values are returned as strings. This is because HTML attributes are inherently string-based. Adding the "+" before the (selectedSquare.getAttribute("cellIndex")) converts the value to an integer. 

// squareStatus is the array that represents the status of each square in the board.
// selectedSquareIndex holds the index value of the square that was clicked on.
// squareStatus[selectedSquareIndex] accesses the element in the squareStatus array at the position specified by the selectedSquareIndex. For example, if selectedSquareIndex is 0, then it would access the first element in the squareStatus array.
// the second if statement checks to see if the element in the squareStatus array selected by squareStatus[selectedSquareIndex] is empty (""). If it is empty (""), then the data model will be updated with an emoji based on which player's turn it is. 

// A function that keeps track of the data for the game board

function checkSquareStatus(event) {
    if (event.target.classList.contains('square')) {
        var selectedSquare = event.target.closest('div')
        console.log("selectedSquare:", selectedSquare)
        var selectedSquareIndex = +(selectedSquare.getAttribute("cellIndex"))
        console.log("selectedSquareIndex:", selectedSquareIndex)
      } 
    if (squareStatus[selectedSquareIndex] === "") {
      squareStatus[selectedSquareIndex] = player1.token
     
    } else if (squareStatus[selectedSquareIndex] === "🌈" || squareStatus[selectedSquareIndex] === "🦄") {
      window.alert('Please Select Another Square!')
    }
    // checkWinConditions()
    switchPlayersTurn(selectedSquareIndex) // selected SquareIndex is the ARGUMENT THAT IS BEING PASSED WHEN THE FUNCTION IS INVOKED. 

}

// A function that keeps track of which player’s turn it currently is
// sqaureStatus is the parameter

function switchPlayersTurn(selectedSquareIndex) {
  if (player1.isTurn === true) {
    player1.isTurn = false
    player2.isTurn = true
    player1.moves.push(selectedSquareIndex)
  } else {
    player2.isTurn = false 
    player1.isTurn = true 
    player2.moves.push(selectedSquareIndex)
}
    console.log("players:", player1, player2)
}

// A function that checks the game board data for win conditions

function checkWinConditions() {
   for (var i = 0; i < winConditions.length; i++) {
    var tokensPlaced = 0
    for (var j = 0; j < winConditions[i].length; j++) {
        if(player1.moves.indexOf(winConditions[i][j]!== -1) {
            // UPDATE TOKENS PLACED 
        }
    }
 
}
}

// if the index does exist inside that array, update the win counter. 
// A function that detects when a game is a draw (no one has won)

function checkForDraw() {
  
}

// A function called increaseWins - increases the count of a player’s wins (should work for either player)

// A function that resets the game board’s data to begin a new game
function resetGame() {
  
}