//-----------------Game Board Module--------------------
const gameBoard = (() => {
  let currentBoard = new Array(9);
  const board = document.querySelector("[data-gameBoard]");

  //set initial hover state
  board.classList.add("x");

  //create function to insert values into the array
  const addMoveToBoard = (index, sign) => {
    currentBoard[index] = sign;
  };

  //create function to place mark on the board
  const placeMark = (index, sign) => {
    let cell = document.querySelector(`[data-cell="${index}"]`);
    cell.classList.add(`${sign}`);
  };

  //create function to change the current hover state
  const changeHoverState = () => {
    board.classList.remove("x");
    board.classList.remove("o");
    if (gameController.isTurnX()) {
      board.classList.add("x");
    } else {
      board.classList.add("o");
    }
  };

  //Create function to pass currentBoard to displayController
  const getCurrentBoard = () => currentBoard;

  //Create function to check for a winner or a draw
  return {
    getCurrentBoard,
    addMoveToBoard,
    changeHoverState,
    placeMark,
  };
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
  }
  return {};
})();

//-------------Play Object Factory-------------
const Player = (sign) => {
  const _sign = sign;
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //getter for this player's sign
  const getSign = () => _sign;

  const placeMark = (index) => {
    gameBoard.placeMark(index, _sign);
  };

  const insertIntoArray = (index) => {
    gameBoard.addMoveToBoard(index, _sign);
  };

  const checkWin = (currentBoard) => {
    return WINNING_COMBOS.some((combination) => {
      return combination.every((index) => {
        return currentBoard[index] == _sign;
      });
    });
  };

  return {
    getSign,
    placeMark,
    insertIntoArray,
    checkWin,
  };
};

//----------------Game Controller Module ------------------
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
      playerX.insertIntoArray(index);
      if (playerX.checkWin(gameBoard.getCurrentBoard())) {
        console.log("X wins!");
      }
    } else {
      playerO.placeMark(index);
      playerO.insertIntoArray(index);
      if (playerO.checkWin(gameBoard.getCurrentBoard())) {
        console.log("O wins!");
      }
    }

    //check for draw
    switchTurn();
  };

  //getter for current turn. True means its X's turn
  const isTurnX = () => xTurn;

  //controller to switch the current turn
  const switchTurn = () => {
    xTurn = !xTurn;

    //update the hover state
    gameBoard.changeHoverState();
  };

  return {
    getPlayerX,
    getPlayerO,
    makePlay,
    isTurnX,
  };
})();
