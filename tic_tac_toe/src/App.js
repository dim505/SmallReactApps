import React from "react";
import './App.css'


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (CalcWin(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  Square(i) {
    return (
      <button className="square" onClick={() => this.handleClick(i)}>
      {this.state.squares[i]}
    </button>
    );
  }

  render() {
    const winner = CalcWin(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
       status = "Your Turn: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        <div>{status}</div>
        <div className="board-row">
          {this.Square(0)}
          {this.Square(1)}
          {this.Square(2)}
        </div>
        <div className="board-row">
          {this.Square(3)}
          {this.Square(4)}
          {this.Square(5)}
        </div>
        <div className="board-row">
          {this.Square(6)}
          {this.Square(7)}
          {this.Square(8)}
        </div>
      </div>
    );
  }
}

function CalcWin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
}



export default Board


