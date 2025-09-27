import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleCellClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  useEffect(() => {
    if (winner) {
      // alert(`Vencedor: ${winner}`); // Removido para usar a mensagem de status
    } else if (board.every(cell => cell !== null)) {
      // alert('Empate!'); // Removido para usar a mensagem de status
    }
  }, [board, winner]);

  let status;
  let statusClassName = ""; // Nova variável para a classe

  if (winner) {
    status = "Vencedor: " + winner;
    statusClassName = "winner-message"; // Classe para o vencedor
  } else if (board.every(cell => cell !== null)) {
    status = "Empate!";
    statusClassName = "draw-message"; // Classe para o empate
  } else {
    status = "Próximo a jogar: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="App">
      <h1 className="title">JOGO DA VELHA</h1>
      
      <div className={`status ${statusClassName}`}>{status}</div>
      
      <div className="board">
        {board.map((value, index) => (
          <div
            className={`cell ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reiniciar Jogo
      </button>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;