import { useState } from "react";

function Square({ value, onSquareClick, highlight = false }) {
  return (
    <button
      className={`square${highlight ? " square--highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i, row, col) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    const loc = "(" + row + "," + col + ")";
    const nextMove = {board: nextSquares, move: loc};
    onPlay(nextMove);
  }

  const result = calculateWinner(squares);
  const winner = result?.player || null;
  const winningLine = result?.line || [];
  let status;
  if (winner) {
    if (winner === "Draw") status = "Draw!";
    else status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const idx = i * 3 + j;
      cells.push(
        <Square
          key={idx}
          value={squares[idx]}
          onSquareClick={() => handleClick(idx, i+1, j+1)}
          highlight={winningLine.includes(idx)}
        />,
      );
    }
    rows.push(
      <div key={i} className="board-row">
        {cells}
      </div>,
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{board: Array(9).fill(null), move: ""}]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].board;
  const lastMove = history[currentMove].move;
  const [ascOrder, setAscOrder] = useState(true);

  function handlePlay(nextMove) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextMove];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
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

function calculateWinner(squares) {
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
