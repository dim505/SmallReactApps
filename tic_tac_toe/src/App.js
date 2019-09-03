import React from "react";
import './App.css';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import * as Fireworks from 'fireworks-canvas'



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

  componentDidMount(){
    document.title = "Tic Tac Toe"
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
  async ResetClick() {

    //clears the state to defaults
    await this.setState({
      //Fills square array with nulls, will be used to keep track of moves
      squares: Array(9).fill(null),
      //determines the who is going to go next
      xIsNext: true,
      PlayerActBtn: false,
      XorO: false
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
      if (this.state.squares.indexOf(null) === -1 ) {
          return 
        }
          else {
            i = this.CompGuess();
        squares[i] = this.state.xIsNext ? "X" : "O";
  
        await this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext
        });
        
          }
        
        




     

    }
  }

  //strcture of the square
  Square(i) {
    if (this.state.squares[i] !== null) {
      return (
        <Button
      
        variant="contained"
        color="primary"
        className="square"
        onClick={() => this.handleClick(i)}
      >
        {this.state.squares[i]}
      </Button>


      );


    } else {

      return (
        <Button
      
        variant="outlined"
        className="square"
        
        onClick={() => this.handleClick(i)}
      >
        {this.state.squares[i]}
      </Button>


      );
      

    }

  }

  

  render() {
    


    //checks if there is a   winner
    const winner = CalcWin(this.state.squares);
    let status;

    //if there is a winner, it shows the winnter
    if (winner) {
      // needs at least a container element, you can provide options
      // (options are optional, defaults defined below)
      
      
      var height = document.getElementById('center').offsetHeight + "px"
      
      document.getElementById('container').style.height = height 
      const container = document.getElementById('container')
      const options = {
        maxRockets: 3,            // max # of rockets to spawn
        rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
        numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
        explosionMinHeight: 0.1 ,  // percentage. min height at which rockets can explode
        explosionMaxHeight: 1,  // percentage. max height before a particle is exploded
        explosionChance: 0.08     // chance in each tick the rocket will explode
      }

      // instantiate the class and call start
      // this returns a disposable - calling it will stop fireworks.
      const fireworks = new Fireworks(container, options) 
    
    
      fireworks.start()


      


      status = "Winner: " + winner;
      setTimeout(function(){ fireworks.stop() 
      
        var elements = document.getElementsByTagName('canvas')
        while (elements[0]) elements[0].parentNode.removeChild(elements[0])
      
      }, 5000);


    }

    //else displays the next person to go
    else if (this.state.squares.indexOf(null) === -1) {
      status = "No Winner :c";
    } else {
      status = "Your Turn: " + (this.state.xIsNext ? "X" : "O");
    }


    

    
    return (
      <div>
       
      <Fade right cascade>
       
      <div id="center">
        <h1 id="title"> Welcome to My Tic Tac Toe App </h1>
        <div>

          <h2 className="headerTwo">Please Select Player Mode </h2>
          <Button
            variant={this.state.PlayerActBtn ? "contained" : "outlined"}
            color={this.state.PlayerActBtn ? "primary" : ""}
            onClick={() => this.NumOfPlayer("1")}
          >
            Single Player
          </Button>
          <Button
            variant={this.state.PlayerActBtn ? "outlined" : "contained"}
            color={this.state.PlayerActBtn ? "" : "primary"}
            onClick={() => this.NumOfPlayer("2")}
          >
            {" "}
            Multiplayer{" "}
          </Button>
        </div>
        <div>
          <h2 className="headerTwo"> Who Goes First? </h2>
          <Button
            variant={this.state.XorO ? "contained" : "outlined"}
            color={this.state.XorO ? "primary" : ""}
            onClick={() => this.SetFirstPlayer("X")}
          >
          
            X
          </Button>
          <Button
          
            variant={this.state.XorO ? "outlined" : "contained"}
            color={this.state.XorO ? "" : "primary"}
            onClick={() => this.SetFirstPlayer("O")}
          >
            
            O
          </Button> 
        </div>
        <div className="MarginStyle headerTwo" ><h3>{status}</h3></div> 
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
        <Button className="width MarginStyle" variant="outlined" size="large" onClick={() => this.ResetClick()}> Reset? </Button> 
        
      </div>
      </Fade>
      <div id="container"></div>
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

