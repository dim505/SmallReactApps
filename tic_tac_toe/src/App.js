import React from "react";
import './App.css';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import * as Fireworks from 'fireworks-canvas'
import Snackbar from '@material-ui/core/Snackbar';
import Jello from 'react-reveal/Jello';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Fills square array with nulls, will be used to keep track of moves
      squares: Array(9).fill(null),
      //determines the who is going to go next
      xIsNext: true,
      PlayerActBtn: false,
      XorO: false,
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
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
      if (this.state.open !== true) {
        this.setState({
          open: true
        });
      }

    }
  }

  NumOfPlayer(i) {
   
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
        if (this.state.open !== true) {
          this.setState({
            open: true
          })
        }
;

     
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

   async handleClose() {

    await this.setState({
     open: false
     
   });


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

      
      var height = document.getElementById('center').offsetHeight + "px"
      
      document.getElementById('container').style.height = height 
      const container = document.getElementById('container')
      const options = {
        maxRockets: 3,            
        rocketSpawnInterval: 150, 
        numParticles: 100,        
        explosionMinHeight: 0.1 ,  
        explosionMaxHeight: 1,  
        explosionChance: 0.08     
      }

     
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
      
      status = "No Winner ☹";
    } else {
      status = "Your Turn: " + (this.state.xIsNext ? "X" : "O");
    }



  

    
    return (
      <div>
        <Snackbar
        anchorOrigin={  {vertical: 'top', horizontal: 'center'} }
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Sorry, game is in session. Please reset game if you want to change any options</span>}
      />
      
      
      <Fade right cascade>
      <div id="center">
        <h1 id="title"> Welcome to My Tic Tac Toe App </h1>
        

          <h2 className="headerTwo">Please Select Player Mode </h2>
          <div className="flex-grid"> 
         
          
          <Jello when={this.state.open}> 
          <div className="left">
                <Button
                  variant={this.state.PlayerActBtn ? "contained" : "outlined"}
                  color={this.state.PlayerActBtn ? "primary" : ""}
                  onClick={() => this.NumOfPlayer("1")}
                >
                  Single Player
                </Button>
                </div>

          <div className="right">
          <Button
            variant={this.state.PlayerActBtn ? "outlined" : "contained"}
            color={this.state.PlayerActBtn ? "" : "primary"}
            onClick={() => this.NumOfPlayer("2")}
          >
            {" "}
            Multiplayer{" "}
          </Button>
          </div>
          </Jello>
        </div>

        <div> 
          <h2 className="headerTwo"> Who Goes First? </h2>
          <div className="flex-grid"> 
          <Jello when={this.state.open}> 
          <div className="left">
          <Button
            variant={this.state.XorO ? "contained" : "outlined"}
            color={this.state.XorO ? "primary" : ""}
            onClick={() => this.SetFirstPlayer("X")}
          >
          
            X
          </Button>
          </div>
          <div className="right">
          <Button
          
            variant={this.state.XorO ? "outlined" : "contained"}
            color={this.state.XorO ? "" : "primary"}
            onClick={() => this.SetFirstPlayer("O")}
          >
            
            O
          </Button> 
          </div>
          </Jello>
          </div>
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
        <Button className="width MarginStyle" variant="outlined" size="large" onClick={() => this.ResetClick()}> Reset Game </Button> 
        
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

