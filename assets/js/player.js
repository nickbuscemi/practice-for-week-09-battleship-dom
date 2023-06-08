import Board from "./board.js";

class Player {
    constructor() {
        this.board = new Board();
    }
    makeHit(row, col) {
        return this.board.makeHit(row, col);
    }
    isGameOver() {
        return this.board.isGameOver();
    }
}

class HumanPlayer extends Player {
    constructor() {
        super();
    }
}

class ComputerPlayer extends Player {
    constructor() {
        super();
        this.pastMoves = new Set();
    }

    makeRandomMove() {
        let row, col;
        do {
            row = Math.floor(Math.random() * this.board.numRows);
            col = Math.floor(Math.random() * this.board.numCols);
        } while (this.pastMoves.has(`${row},${col}`));
        this.pastMoves.add(`${row},${col}`);
        return this.makeHit(row, col);
    }
}





export { HumanPlayer, ComputerPlayer };