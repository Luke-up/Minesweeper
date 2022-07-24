import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Row, Card, Container, Col } from "react-bootstrap";
import SetterScreen from "./components/SetterScreen.js";
import GameScreen from "./components/GameScreen.js";

function App() {
  //Set variable from SetterScreen to determine the game parameters
  const [gameInputs, setGameInputs] = React.useState({
    span: 2,
    bombs: 0.2,
    gameLoading: true,
    gameEnd: "none",
  });

  let span = gameInputs.span;
  let bombs = gameInputs.bombs;
  let gameLoading = gameInputs.gameLoading;

  let tileArray = [];

  //Convert the span measurement to the correspondng number of tiles in width
  let width = 12;
  if (span == 2) {
    width = 6;
  } else if (span == 3) {
    width = 4;
  } else if (span == 4) {
    width = 3;
  }

  //Generate bomb amont based on size of grid and user selected difficulty level
  let bombAmount = Math.round(width * width * bombs);

  //Low fraction is passed so that exactly 1 bomb can be rendered despite the size of grid
  //As an additional option for the user
  if (bombs == 0.01) {
    bombAmount = 1;
  }

  //Array of ordinary tiles based on the size, minus the bomb tiles
  const tileArrayNoBombs = Array(width * width - bombAmount).fill({
    type: "blank",
    nearBombAmount: 0,
  });

  //Array of bomb tiles based off of difficulty to width ratio
  const tileArrayBombs = Array(bombAmount).fill({
    type: "bomb",
  });

  //Function to join the two newly created arrays and mix them together in a random pattern
  let tempTileArray = tileArrayNoBombs
    .concat(tileArrayBombs)
    .sort(() => Math.random() - 0.5);
  //setGameLoading(false);
  //}

  //Loop through array to add unique id and carry over the type
  //Create a new array to hold these objects
  for (let i = 0; i < tempTileArray.length; i++) {
    let nearBombAmount = 0;
    const RHS = (i + 1) % width == 0;
    const LHS = i % width == 0;
    //check all tiles to the right
    if (!RHS && tempTileArray[i + 1].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the left
    if (!LHS && tempTileArray[i - 1].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the top
    if (i >= width && tempTileArray[i - width].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the top right
    if (i >= width && !RHS && tempTileArray[i - width + 1].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the top left
    if (i > width && !LHS && tempTileArray[i - width - 1].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the bottom
    if (i < width * width - width && tempTileArray[i + width].type === "bomb") {
      nearBombAmount += 1;
    }
    //check all tiles to the bottom right
    if (
      i < width * width - width &&
      !RHS &&
      tempTileArray[i + width + 1].type === "bomb"
    ) {
      nearBombAmount += 1;
    }
    //check all tiles to the bottom left
    if (
      i < width * width - width &&
      !LHS &&
      tempTileArray[i + width - 1].type === "bomb"
    ) {
      nearBombAmount += 1;
    }
    //construct tile and push to new array
    const newTile = {
      id: i,
      type: tempTileArray[i].type,
      colour: tempTileArray[i].colour,
      warningNum: Number(nearBombAmount),
      clicked: false,
      flagged: false,
    };
    tileArray.push(newTile);
  }

  //Renders either the game screen or the loading screen to input game variables
  return (
    <Container>
      {gameLoading ? (
        <div>
          <SetterScreen setGameInputs={setGameInputs} />
        </div>
      ) : (
        <GameScreen
          width={width}
          bombAmount={bombAmount}
          gameBoard={tileArray}
          setGameInputs={setGameInputs}
          gameInputs={gameInputs}
        />
      )}
    </Container>
  );
}
export default App;
