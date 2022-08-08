//-----------------Game Board Module--------------------
const gameBoard = (() => {
  let currentBoard = new Array(9);
  const cellElements = document.querySelectorAll("[data-cell]");

  //Starts and restarts the game
  const startGame = () => {
    cellElements.forEach((cell) => {
      cell.classList.remove("x");
      cell.classList.remove("o");
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    });

    for (i = 0; i < 9; i++) {
      currentBoard[i] = "";
    }

    gameController.resetBoard();

    displayController.resetBoard();
  };

  //for the cell.addEventListener above
  const handleClick = (e) => {
    const index = e.target.dataset.cell;
    gameController.makePlay(index);
  };

  //Insert given sign into currentBoard at given index
  const addMoveToBoard = (index, sign) => {
    currentBoard[index] = sign;
  };

  //Place given sign at given index within the data-cell list
  const placeMark = (index, sign) => {
    let cell = document.querySelector(`[data-cell="${index}"]`);
    cell.classList.add(`${sign}`);
  };

  //Getter for currentBoard Array
  const getCurrentBoard = () => currentBoard;

  return {
    getCurrentBoard,
    addMoveToBoard,
    placeMark,
    startGame,
  };
})();

//--------------Display Controller Module------------

const displayController = (() => {
  const gameOverScreen = document.querySelector("[data-gameOverScreen]");
  const gameOverText = document.querySelector("[data-gameOverText]");
  const restartButton = document.querySelector("[data-restartButton]");
  const board = document.querySelector("[data-gameBoard]");

  //Shows game winning screen with given sign
  const endGameWithWin = (sign) => {
    gameOverText.innerHTML = `${sign}'s Win!!`;
    gameOverScreen.classList.add("show");
  };

  //Shows game over screen with a draw
  const endGameWithDraw = () => {
    gameOverText.innerHTML = "It's a draw!";
    gameOverScreen.classList.add("show");
  };
  //Resets the displayController portion of the game
  const resetBoard = () => {
    gameOverScreen.classList.remove("show");
    changeHoverState();
  };

  //checks the current turn and changes the board's hover state to that player
  const changeHoverState = () => {
    board.classList.remove("x");
    board.classList.remove("o");
    if (gameController.isTurnX()) {
      board.classList.add("x");
    } else {
      board.classList.add("o");
    }
  };

  //Adds event listener to the restart button
  restartButton.addEventListener("click", () => {
    gameBoard.startGame();
  });

  return {
    endGameWithWin,
    endGameWithDraw,
    changeHoverState,
    resetBoard,
  };
})();

//-------------Player Object Factory-------------
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

  //Compares the currentBoard array to WINNING_COMBOS array and returns true if any winning combo is preset within currentBoard
  const checkWin = (currentBoard) => {
    return WINNING_COMBOS.some((combination) => {
      return combination.every((index) => {
        return currentBoard[index] == _sign;
      });
    });
  };

  const winningPlay = () => {
    displayController.endGameWithWin(_sign);
  };

  return {
    getSign,
    placeMark,
    insertIntoArray,
    checkWin,
    winningPlay,
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
        return playerX.winningPlay();
      }
    } else {
      playerO.placeMark(index);
      playerO.insertIntoArray(index);
      if (playerO.checkWin(gameBoard.getCurrentBoard())) {
        return playerO.winningPlay();
      }
    }
    if (isDraw(gameBoard.getCurrentBoard())) {
      return displayController.endGameWithDraw();
    } else {
      switchTurn();
    }
  };

  //Check each cell within currentBoard Array, returns true if all are filled with x and o
  const isDraw = (currentBoard) => {
    return [...currentBoard].every((element) => {
      return element == "x" || element == "o";
    });
  };

  //getter for current turn. True means its X's turn
  const isTurnX = () => xTurn;

  //controller to switch the current turn
  const switchTurn = () => {
    xTurn = !xTurn;
    displayController.changeHoverState();
  };

  const resetBoard = () => {
    xTurn = true;
  };

  return {
    getPlayerX,
    getPlayerO,
    makePlay,
    isTurnX,
    resetBoard,
  };
})();

gameBoard.startGame();
