import { calculateWinner } from "./App";
import { Square } from "./Square";

export function Board({ xIsNext, squares, onPlay }) {
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
    const nextMove = { board: nextSquares, move: loc };
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
          onSquareClick={() => handleClick(idx, i + 1, j + 1)}
          highlight={winningLine.includes(idx)} />
      );
    }
    rows.push(
      <div key={i} className="board-row">
        {cells}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}
