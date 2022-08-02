//gameBoard is created as a module
const gameBoard = (() => {
  let currentBoard = new Array(9);
  const winningCombos = [];

  //Create function to pass currentBoard to displayController
  const getCurrentBoard = () => currentBoard;

  //Create function to check for a winner or a draw
  return { getCurrentBoard };
})();

//Create displayController module

const displayController = (() => {
  const cellElements = document.querySelectorAll("[data-cell]");

  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  function handleClick(e) {
    const index = e.target.dataset.cell;
    console.log(`Clicked cell ${index}`);
    gameController.makePlay(index);
    //insert into array
    //check for win
    //check for draw
    gameController.switchTurn();
  }
  return {};
})();

//Create factory function for player objects
const Player = (sign) => {
  const _sign = sign;

  //getter for this player's sign
  const getSign = () => _sign;

  const placeMark = (index) => {
    let cell = document.querySelector(`[data-cell="${index}"]`);
    cell.classList.add(`${_sign}`);
  };

  return {
    getSign,
    placeMark,
  };
};

const gameController = (() => {
  const playerX = Player("x");
  const playerO = Player("o");
  let xTurn = true;

  //player objects getters
  const getPlayerX = () => playerX;
  const getPlayerO = () => playerO;

  //starts the process to place a mark inside the grid
  const makePlay = (index) => {
    if (xTurn) {
      playerX.placeMark(index);
    } else {
      playerO.placeMark(index);
    }
  };

  //getter for current turn. True means its X's turn
  const isTurnX = () => xTurn;

  //controller to switch the current turn
  const switchTurn = () => {
    xTurn = !xTurn;
  };

  return {
    getPlayerX,
    getPlayerO,
    makePlay,
    isTurnX,
    switchTurn,
  };
})();
