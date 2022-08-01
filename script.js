//gameBoard is created as a module
const gameBoard = (() => {
  let currentBoard = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  const winningCombos = [];

  //Create function to pass currentBoard to displayController
  const getCurrentBoard = () => {
    return currentBoard;
  };

  //Create function to check for a winner or a draw
})();

//Create displayController module

const displayController = (() => {
  //create function to render currentBoard
  const displayBoard = () => {
    let gameBoard = gameBoard.getCurrentBoard();
    //loop through and attch divs to show an "x" or an "o"
  };
})();

//Create factory function for player objects
const Player = () => {
  //create function to take move
  //create function to switch turn
};
