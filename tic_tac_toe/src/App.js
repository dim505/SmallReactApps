import React from "react";
import './App.css';
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import * as Fireworks from 'fireworks-canvas'
import Snackbar from '@material-ui/core/Snackbar';
import Jello from 'react-reveal/Jello';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Fills square array with nulls, will be used to keep track of moves
      squares: Array(9).fill(null),
      //determines the who is going to go next after the first player
      xIsNext: true,
      //highlights the number of players who is going to play (single or mutli) then select the appropriate BTN
      PlayerActBtn: false,
      //determines if X is going to first or if O is going to go first
      XorO: false,
      //used to determine when the error pop up is going to occurr
      open: false,
      //used to determine when the reset dialog pop up is going to occurr
      ResetOpen: false,
      //keeps track if fireworks went off already
      AlreadyFired: false
    };
    //function used to  close out error pop up
    this.handleClose = this.handleClose.bind(this);
    //function used to set flag to bring up the Comfirm reset dialog pop up
    this.ResetHandleClose = this.ResetHandleClose.bind(this);
    //function used to actually set the game if pressed reset 
    this.ResetGame = this.ResetGame.bind(this);
  }

  componentDidMount(){
    //sets tab title
    document.title = "Tic Tac Toe"
  }
  
  SetNumPlayerBtn() {
    //this sets the flag to select which button would be selected  (single or multiplayer)
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
          //determines who going to go next with each turn
          xIsNext: true,
          //this determines which button is going to get high lighted first X or O 
          XorO: false
        });
      }
      //else O is set to go first
      else {
        this.setState({
          //determines who going to go next with each turn
          xIsNext: false,
          //this determines which button is going to get high lighted first X or O 
          XorO: true
        });
      }
    } else {
      //this sets open to true so the error box will appear
      if (this.state.open !== true) {
        this.setState({
          open: true
        });
      }

    }
  }

  NumOfPlayer(i) {
    //makes sure a game is not in progress
    if (
      this.state.squares.indexOf("X") === -1 &&
      this.state.squares.indexOf("O") === -1
    ) {
      //
      if (i === "1") {
        //sets the number of players global variable 
        window.NumOfPlayer = 1;
        //call this function to set the flag to highlight the correct button
        this.SetNumPlayerBtn();
      } else {
         //sets the number of players global variable 
        window.NumOfPlayer = 2;
        //call this function to set the flag to highlight the correct button (single button or mutlit)
        this.SetNumPlayerBtn();
      }
    } else {
        //if game is in progress, sets open to true so error box appears
        if (this.state.open !== true) {
          this.setState({
            open: true
          })
        }
;

     
    }
  }

  //sets flag to true so the confirm reset game dialog appears
  async ResetClick() {
    await this.setState({ResetOpen: true });
      
  }

  //IF pressed reset, this function is called resetting the game
 ResetGame() {

    //clears the state to defaults
     this.setState({
    //Fills square array with nulls, will be used to keep track of moves
    squares: Array(9).fill(null),
    //determines the who is going to go next
    xIsNext: true,
    //determines what button to highlight single player or mutli
    PlayerActBtn: false,
    //determines what button is going to get high lighted. X or O
    XorO: false,
    //keeps track if fireworks went off already
    AlreadyFired: false
  });
  //resets your turn/winner status
  this.status = "";
  //resets the number of players selected
  window.NumOfPlayer = "";
  //calls function to close the reset game comfirm dialog
  this.ResetHandleClose()



}



  //function to generate computer geuss
  CompGuess(CompGuess) {
    //copies current positions of board to new array
    const squares = this.state.squares.slice();

    
    //generates a random number until the generated number finds an emtpy spot on the board
    do {
      CompGuess = Math.floor(Math.random() * 9);
    } while (squares[CompGuess] !== null);
    //returns the number
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
    //
    if (window.NumOfPlayer === 1) {
      //if BOARD IS full, it returns nothing
      if (this.state.squares.indexOf(null) === -1 ) {
          return 
        }
          else {
            //gets computer guess
            i = this.CompGuess();
            //updates sqaure with users turn
            squares[i] = this.state.xIsNext ? "X" : "O";
  
        await this.setState({
          //updates board
          squares: squares,
          //switches for next player
          xIsNext: !this.state.xIsNext
        });
        
          }
        
        




     

    }
  }

    //function that automaticly closes error pop up
   async handleClose() {

    await this.setState({
     open: false
     
   });


 }

   //function that automaticly closes the reset game confirm dialog
 async ResetHandleClose() {

  await this.setState({
    ResetOpen: false
   
 });


}



  //strcture of the square
  Square(i) {
    //returns blue square if button pressed has a value
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
      //returns a blank sqaure if pressed say if the game is over
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

    //if there is a winner, it shows the winner status
    if (winner) {



      

      //updates the status
      status = "Winner: " + winner;

     if (this.state.AlreadyFired === false) {
                  //gets height of root
                  var height = document.getElementById('center').offsetHeight + "px"
                  //sets container height for fireworks
                  document.getElementById('container').style.height = height 
                  //gets container object
                  const container = document.getElementById('container')
                  //specifies various parameters
                  const options = {
                    maxRockets: 3,            
                    rocketSpawnInterval: 150, 
                    numParticles: 100,        
                    explosionMinHeight: 0.1 ,  
                    explosionMaxHeight: 1,  
                    explosionChance: 0.08     
                  }
            
                  //created an object from various parameters
                  const fireworks = new Fireworks(container, options) 
                
                  //starts the fireworks
                  fireworks.start()
      
                  
      
            //stops fireworks after 5 seconds and removes canvas. <<used to display fireworks
            setTimeout(function(){
              
              fireworks.stop() 
            
              var elements = document.getElementsByTagName('canvas')
              while (elements[0]) elements[0].parentNode.removeChild(elements[0])
            
            }, 5000);
      
            //sets flag to true so you know fireworks been fired already
            this.setState ({
             AlreadyFired: true
            })


     }

         

    }

    //displays if there is a tie
    else if (this.state.squares.indexOf(null) === -1) {
      
      status = "No Winner ☹";
    //else displays the next person to go
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
      
      <Dialog
        open={this.state.ResetOpen}
        onClose={this.ResetHandleClose}
        
      >
        <DialogTitle style={{ cursor: 'move' }}>
          Reset Tic Tac Toe Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.ResetHandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.ResetGame} color="primary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      
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

            variant={this.state.XorO ? "outlined" : "contained"}
            color={this.state.XorO ? "" : "primary"}
            onClick={() => this.SetFirstPlayer("X")}
          >
          
            X
          </Button>
          </div>
          <div className="right">
          <Button
          
            variant={this.state.XorO ? "contained" : "outlined"}
            color={this.state.XorO ? "primary" : ""}
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

