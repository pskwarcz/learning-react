import { useState } from "react";
import { useImmer } from 'use-immer';
import { Board } from "./Board";

export default function Game() {
  const [history, updateHistory] = useImmer([{board: Array(9).fill(null), move: ""}]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].board;
  const lastMove = history[currentMove].move;
  const [ascOrder, setAscOrder] = useState(true);

  function handlePlay(nextMove) {
    updateHistory(draft => {
      draft.length = currentMove + 1;
      draft.push(nextMove);
    });
    setCurrentMove(currentMove + 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((board, moveNo) => {
    let description;
    if (moveNo > 0) {
      description = "Go to move #" + moveNo;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={moveNo}>
        {board.move+' '}
        {moveNo === currentMove ? (
          <span>You are at move #{moveNo}</span>
        ) : (
          <button onClick={() => jumpTo(moveNo)}>{description}</button>
        )}
      </li>
    );
  });

  if (!ascOrder) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setAscOrder(!ascOrder)}>Sort</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: element };
    }
  }
  if (squares.every((square) => square)) {
    return { player: "Draw", line: [] };
  }
  return null;
}
