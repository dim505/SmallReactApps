import React from "react";
import './App.css'
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Fills square array with nulls, will be used to keep track of moves
      squares: Array(9).fill(null),
      //determines the who is going to go next
      xIsNext: true,
      PlayerActBtn: false,
      XorO: false
    };
  }

  SetNumPlayerBtn() {
    if (window.NumOfPlayer === 1) {
      this.setState({ PlayerActBtn: true });
    } else {
      this.setState({ PlayerActBtn: false });
    }
  }

  //sets the first player to go first
  SetFirstPlayer(i) {
    if (
      this.state.squares.indexOf("X") === -1 &&
      this.state.squares.indexOf("O") === -1
    ) {
      //if pressed X, X is going to go first
      if (i === "X") {
        this.setState({
          xIsNext: true,
          XorO: true
        });
      }
      //else O is set to go first
      else {
        this.setState({
          xIsNext: false,
          XorO: false
        });
      }
    } else {
      alert(
        "Sorry Game is in session, please reset Game if you want to change the order"
      );
    }
  }

  NumOfPlayer(i) {
    debugger;
    if (
      this.state.squares.indexOf("X") === -1 &&
      this.state.squares.indexOf("O") === -1
    ) {
      if (i === "1") {
        window.NumOfPlayer = 1;
        this.SetNumPlayerBtn();
      } else {
        window.NumOfPlayer = 2;
        this.SetNumPlayerBtn();
      }
    } else {
      alert(
        "Sorry Game is in session, please reset Game if you want to change the number of players"
      );
    }
  }

  //this reset the board
  ResetClick() {
    //gets all the square elements on board
    var squaress = document.querySelectorAll(".square"),
      i;

    //clears all the button values
    for (i = 0; i < squaress.length; ++i) {
      squaress[i].innerHTML = null;
    }

    //clears the state to defaults
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      PlayerActBtn: false
    });
    this.status = "";
    window.NumOfPlayer = "";
  }

  CompGuess(CompGuess) {
    const squares = this.state.squares.slice();

    //fix issue with it generating number until it gets a null

    do {
      CompGuess = Math.floor(Math.random() * 9);
    } while (squares[CompGuess] !== null);

    return CompGuess;
  }

  async handleClick(i) {
    debugger;
    //clears a new array
    const squares = this.state.squares.slice();

    //if user wins or if button with value gets pressed
    //it does nothing
    if (CalcWin(squares) || squares[i]) {
      return;
    }

    //Depending xIsNext state, the pressed square is
    //going to be updated with either X or O

    squares[i] = (await this.state.xIsNext) ? "X" : "O";

    await this.setState({
      //updates squares with new array
      squares: squares,
      //changes flag to show next person is up
      xIsNext: !this.state.xIsNext
    });

    if (window.NumOfPlayer === 1) {
      i = this.CompGuess();
      squares[i] = this.state.xIsNext ? "X" : "O";

      await this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  //strcture of the square
  Square(i) {
    return (
      <button
        className="square btn btn-outline-success"
        onClick={() => this.handleClick(i)}
      >
        {this.state.squares[i]}
      </button>
    );
  }

  SetSquareColor(i) {
    console.log(i);
  }

  render() {
    //checks if there is a winner
    const winner = CalcWin(this.state.squares);
    let status;

    //if there is a winner, it shows the winnter
    if (winner) {
      status = "Winner: " + winner;
    }
    //else displays the next person to go
    else if (this.state.squares.indexOf(null) === -1) {
      status = "No Winner :c";
    } else {
      status = "Your Turn: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <h1 id="title"> Welcome to My Tic Tac Toe App </h1>
        <div>
          <button
            className={this.state.PlayerActBtn ? "PlayerButton" : ""}
            onClick={() => this.NumOfPlayer("1")}
          >
            Single Player
          </button>
          <button
            className={this.state.PlayerActBtn ? "" : "PlayerButton"}
            onClick={() => this.NumOfPlayer("2")}
          >
            {" "}
            Multiplayer{" "}
          </button>
        </div>
        <div>
          <h4> Who is First? </h4>
          <button
            className={this.state.XorO ? "PlayerButton" : ""}
            onClick={() => this.SetFirstPlayer("X")}
          >
            {" "}
            X{" "}
          </button>
          <button
            className={this.state.XorO ? "" : "PlayerButton"}
            onClick={() => this.SetFirstPlayer("O")}
          >
            {" "}
            O{" "}
          </button>
        </div>
        <div>{status}</div> <br />
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
        <button onClick={() => this.ResetClick()}> Reset? </button>
      </div>
    );
  }
}

//function used to calculate the winner
function CalcWin(squares) {
  //these are all the combination of winner squares
  //one must get to win the game
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

  //loops through the lines mutli array
  for (let i = 0; i < lines.length; i++) {
    //sets the 1st and 2nd and 3rd winning position
    const [a, b, c] = lines[i];
    if (
      //checls if there is a match for either X or 0
      //in all the squares that are the winning line
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] &&
      squares[a] === squares[c]
    ) {
      //if match, it will return the winner
      return squares[a];
    }
  }
}

export default Board

