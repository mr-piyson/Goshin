import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const winner = (() => {
    const lines: number[][] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) {
      const a = line[0]!, b = line[1]!, c = line[2]!;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]!;
    }
    return board.every(Boolean) ? 'Draw' : null;
  })();

  const click = (i: number) => {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = xTurn ? 'X' : 'O';
    setBoard(next);
    setXTurn(!xTurn);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setXTurn(true); };

  return (
    <div className="w-full max-w-xs">
      <h2 className="mb-3 text-base font-semibold">Tic-tac-toe</h2>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button key={i} onClick={() => click(i)} className="ui-tile aspect-square rounded-xl text-3xl font-bold">
            {v}
          </button>
        ))}
      </div>
      <div className="mb-2 text-sm ui-muted">{winner ? (winner === 'Draw' ? "It's a draw" : `${winner} wins!`) : `${xTurn ? 'X' : 'O'}'s turn`}</div>
      <button onClick={reset} className="ui-btn rounded-lg px-3 py-1 text-sm">Reset</button>
    </div>
  );
}