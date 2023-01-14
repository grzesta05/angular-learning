import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';

export type tile = {
  x: number;
  y: number;
  clicked: boolean;
  value: string;
};

function initArray() {
  const arr: Array<Array<tile>> = Array(3);
  for (let i = 0; i < 3; i++) {
    arr[i] = Array<tile>(3);
    for (let o = 0; o < 3; o++) {
      arr[i][o] = { y: i, x: o, clicked: false, value: '' };
    }
  }
  return arr;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Tic Tac Toe';
  arr: Array<Array<tile>> = initArray();

  deepCopyBoard() {
    return this.arr.map((valA: tile[]) =>
      valA.map((val: tile) => ({ ...val }))
    );
  }
  winningCondition(player: string, board: Array<Array<tile>>) {
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

  ngOnInit(): void {}

  enemyMove() {
    //implement minmax algorithm

    const getPossibleMoves = (board: Array<Array<tile>>) => {
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
    const calculateWinnings = (
      parentMove: move,
      minOrMax: boolean,
      board: Array<Array<tile>>,
      move: move,
      depth: number
    ) => {
      /*
      1. Apply move
      2. check winnig condition -
        if won and minOrMax true - finish program with incrementing winnings on the move
        if won and minOrMax false - finish program
      else
      3. find possible moves based on the board and call func on them
*/
      board[move.y][move.x] = {
        ...board[move.y][move.x],
        value: minOrMax ? 'o' : 'x',
        clicked: true,
      };

      const possibleMoves = getPossibleMoves(board);

      if (this.winningCondition(minOrMax ? 'o' : 'x', board)) {
        if (minOrMax) {
          winnings[moves.findIndex((val) => val == parentMove)] += 100 + depth;
        } else {
          winnings[moves.findIndex((val) => val == parentMove)] -= 100 + depth;
        }
      } else {
        for (const t of possibleMoves) {
          calculateWinnings(parentMove, !minOrMax, board, t, depth + 1);
          board[t.y][t.x] = {
            ...board[t.y][t.x],
            value: '',
            clicked: false,
          };
        }
      }
    };

    type move = { x: number; y: number };

    const moves: move[] = getPossibleMoves(this.arr);
    const winnings: number[] = [];

    winnings.length = moves.length;
    winnings.fill(0);
    for (const a of moves) {
      calculateWinnings(a, true, this.deepCopyBoard(), a, 0);
    }

    const madeMove = moves[winnings.indexOf(Math.max(...winnings))];
    this.arr[madeMove.y][madeMove.x] = {
      ...this.arr[madeMove.y][madeMove.x],
      value: 'o',
      clicked: true,
    };

    if (this.winningCondition('o', this.arr)) alert('computer won');
  }
  click(e: Event, x: number, y: number) {
    e.preventDefault();

    this.arr[x][y] = { ...this.arr[x][y], clicked: true, value: 'x' };
    if (this.winningCondition('x', this.arr)) {
      alert('You won!');
      return;
    }
    this.enemyMove();
  }
}
