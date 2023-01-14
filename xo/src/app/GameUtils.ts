import { tile, AppComponent } from './app.component';

export default class GameHandling {
  static deepCopyBoard(arr: Array<Array<tile>>) {
    return arr.map((valA: tile[]) => valA.map((val: tile) => ({ ...val })));
  }

  static getPossibleMoves = (board: Array<Array<tile>>) => {
    const getRowPossible = (val: tile) => {
      return !val.clicked;
    };
    const mapPossibleToMoves = (val: tile) => {
      return { x: val.x, y: val.y };
    };
    return [
      ...board[0].filter(getRowPossible).map(mapPossibleToMoves),
      ...board[1].filter(getRowPossible).map(mapPossibleToMoves),
      ...board[2].filter(getRowPossible).map(mapPossibleToMoves),
    ];
  };

  static winningCondition(player: string, board: Array<Array<tile>>) {
    //rows
    for (const row of board) {
      if (row.every((val: tile) => val.value == player)) return true;
    }
    //columns
    for (let i = 0; i < 3; i++) {
      if (
        [board[0][i], board[1][i], board[2][i]].every(
          (val: tile) => val.value == player
        )
      )
        return true;
    }
    //diagonal
    if (
      [board[0][0], board[1][1], board[2][2]].every(
        (val: tile) => val.value == player
      )
    )
      return true;
    if (
      [board[0][2], board[1][1], board[2][0]].every(
        (val: tile) => val.value == player
      )
    )
      return true;
    return false;
  }
  static minimaksiu(board: Array<Array<tile>>, depth: number, isMax: boolean) {
    let score = this.winningCondition('o', board)
      ? 10
      : this.winningCondition('x', board)
      ? -10
      : 0; // If Maximizer has won the game // return his/her evaluated score
    if (score == 10) return score; // If Minimizer has won the game // return his/her evaluated score
    if (score == -10) return score; // If there are no more moves and // no winner then it is a tie
    if (this.getPossibleMoves(board).length == 0) return 0; // If this maximizer's move
    if (isMax) {
      let best = -1000; // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j].value == '') {
            // Make the move
            board[i][j] = { ...board[i][j], clicked: true, value: 'o' }; // Call minimax recursively // and choose the maximum value
            best = Math.max(best, this.minimaksiu(board, depth + 1, !isMax)); // Undo the move
            board[i][j] = { ...board[i][j], clicked: false, value: '' };
          }
        }
      }
      return best;
    } // If this minimizer's move
    else {
      let best = 1000; // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j].value == '') {
            // Make the move
            board[i][j] = { ...board[i][j], clicked: true, value: 'x' }; // Call minimax recursively and // choose the minimum value
            best = Math.min(best, this.minimaksiu(board, depth + 1, !isMax)); // Undo the move
            board[i][j] = { ...board[i][j], clicked: false, value: '' };
          }
        }
      }
      return best;
    }
  }
  static enemyMove(board: Array<Array<tile>>) {
    let bestVal = -1000;
    let bestMove = { x: -1, y: -1 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j].value == '') {
          // Make the move
          board[i][j] = { ...board[i][j], clicked: true, value: 'o' }; // compute evaluation function // for this move.
          let moveVal = this.minimaksiu(board, 0, false); // Undo the move
          board[i][j] = { ...board[i][j], clicked: false, value: '' }; // If the value of the current move // is more than the best value, then // update best
          if (moveVal > bestVal) {
            bestMove.y = i;
            bestMove.x = j;
            bestVal = moveVal;
          }
        }
      }
    }
  }
}
