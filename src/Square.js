
export function Square({ value, onSquareClick, highlight = false }) {
  return (
    <button
      className={`square${highlight ? " square--highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
