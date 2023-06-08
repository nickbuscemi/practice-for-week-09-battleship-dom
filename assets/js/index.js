import Board from "./board.js";
import { HumanPlayer, ComputerPlayer } from './player.js';


let board = new Board(); // creates a new game board
let human; 
let computer; 

let humanBoardContainer;
let computerBoardContainer;
// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

// reset button 
let resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";
resetButton.id = "resetButton";
document.body.appendChild(resetButton);

// game boards in one wrapper
let gameWrapper = document.createElement('div');
gameWrapper.id = "gameWrapper";
document.body.appendChild(gameWrapper);

//tites for game boards
let humanTitle = document.createElement("h2");
humanTitle.textContent = "Player";
let computerTitle = document.createElement("h2");
computerTitle.textContent = "Computer";

function createGame() {
    human = new HumanPlayer();
    computer = new ComputerPlayer();

    // create board container
    humanBoardContainer = document.createElement("div");
    humanBoardContainer.className = "board-container";

    computerBoardContainer = document.createElement("div");
    computerBoardContainer.className = "board-container";

    // create cells
    createCells(human, humanBoardContainer);
    createCells(computer, computerBoardContainer);

    // add board container to body
    gameWrapper.appendChild(humanTitle);
    gameWrapper.appendChild(humanBoardContainer);
    gameWrapper.appendChild(computerTitle)
    gameWrapper.appendChild(computerBoardContainer);
}

function createCells(player, container) {
    for (let row = 0; row < player.board.numRows; row++) {
        for (let col = 0; col < player.board.numCols; col++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleClick.bind(null, player, cell));
            container.appendChild(cell);
        }
    }
}

function handleClick(player, cell) {
    // get the row and column from the selected cell
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    // call the makeHit method from the board instance in board.js
    if (player instanceof HumanPlayer) {
        // call the makeHit method from the board instance in board.js
        const hit = player.makeHit(row, col);
        // if the cell was hit, change the background color of the cell to red
        // if not change the cell color to blue
        if (hit) {
            cell.classList.add('hit');
            cell.textContent = hit;
        } else {
            cell.classList.add('miss');
        }
        // check if the game is over
        if (player.isGameOver()) {
            alert('Game Over, You Win!');
            resetGame();
        }
        // Let the computer take its turn
        setTimeout(computerTurn, 2000);
    }
}
function computerTurn() {
    // Generate a random row and column
    const row = Math.floor(Math.random() * computer.board.numRows);
    const col = Math.floor(Math.random() * computer.board.numCols);

    // Make a hit on the random cell
    const hit = computer.makeHit(row, col);
    // Get the corresponding cell element from the computer's board container
    const cell = computerBoardContainer.querySelector(`[data-row='${row}'][data-col='${col}']`);

    // Update the cell to reflect the result of the hit
    if (hit) {
        cell.classList.add('hit');
        cell.textContent = hit;
    } else {
        cell.classList.add('miss');
    }
    
    // Check if the game is over
    if (computer.isGameOver()) {
        alert('Game Over, Computer Wins!');
        resetGame();
    }
}

createGame();


resetButton.addEventListener("click", () => {
    // remove old game board
    resetGame();
});

function resetGame() {
    // remove old game board
    gameWrapper.removeChild(humanBoardContainer);
    gameWrapper.removeChild(computerBoardContainer);

    // Create new game
    createGame();
}