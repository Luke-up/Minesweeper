import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import Rules from "./Rules.js";

//Render the tiles and handle the user inputs
function GameScreen(props) {
  const [gameRules, setGameRules] = React.useState(false);
  let span = props.gameInputs.span;
  let width = props.width;
  let gameFinish = false;
  let tileSize = "6vh";
  let tilesSelected = 0;
  let flagsAmount = props.bombAmount;
  let goodFlags = props.bombAmount;
  let rulesShow = false;

  //Calculate the size of the grid and tiles as per the variable amount that the user selected
  function setGameBoard() {
    if (span == 2) {
      tileSize = "12vh";
    } else if (span == 3) {
      tileSize = "18vh";
    } else if (span == 4) {
      tileSize = "24vh";
    }
  }
  setGameBoard();

  //Handle investigative clicks on each element
  function handleClick(e) {
    //Check game win conditions have not been met
    if (!gameFinish) {
      //Check that a flag was not already placed on this tile
      if (!e.flagged) {
        let clickedTile = document.getElementById(e.id);
        //Check if tile is a bomb and execute the end of the game, by revealing all other bombs
        if (e.type == "bomb") {
          props.gameBoard.map((a) => {
            let clickedTile = document.getElementById(a.id);
            if (a.type == "bomb") {
              clickedTile.classList.add("bombClicked");
            }
          });
          gameResultMessage("lose");
          gameFinish = true;
        } else {
          //Set clicked property of object so that it is not used in recursive searches
          e.clicked = true;
          //Increment the number of selected tiles that aren't bombs
          tilesSelected++;
          //At this point if all the 'safe' tile have been found game ends
          if (tilesSelected === props.gameBoard.length - props.bombAmount) {
            setTimeout(() => {
              gameFinish = true;
              gameResultMessage("win");
            }, 500);
          }
          //Styling is added to show tiles that have been clicked
          clickedTile.classList.add("numberClicked");
          //If the tile is next to a bomb, reveal the numbers of bombs surrounding it
          if (e.warningNum > 0) {
            clickedTile.innerHTML = e.warningNum;
            //If tile has no surrounding bombs, check every surrounding tile through recursion
          } else {
            //Define areas of the search grid
            const RHS = (e.id + 1) % width === 0;
            const LHS = e.id % width === 0;
            //Click tiles to the right
            if (!RHS && props.gameBoard[e.id + 1].clicked == false) {
              handleClick(props.gameBoard[e.id + 1]);
            }
            //Click tiles to the left
            if (!LHS && props.gameBoard[e.id - 1].clicked == false) {
              handleClick(props.gameBoard[e.id - 1]);
            }
            //Click tiles to the top
            if (
              e.id > width - 1 &&
              props.gameBoard[e.id - width].clicked == false
            ) {
              handleClick(props.gameBoard[e.id - width]);
            }
            //Click tiles to the top right
            if (
              e.id > width - 1 &&
              !RHS &&
              props.gameBoard[e.id - width + 1].clicked == false
            ) {
              handleClick(props.gameBoard[e.id - width + 1]);
            }
            //Click tiles to the top left
            if (
              e.id > width &&
              !LHS &&
              props.gameBoard[e.id - width - 1].clicked == false
            ) {
              handleClick(props.gameBoard[e.id - width - 1]);
            }
            //Click tiles to the bottom
            if (
              e.id < width * width - width &&
              props.gameBoard[e.id + width].clicked == false
            ) {
              handleClick(props.gameBoard[e.id + width]);
            }
            //Click tiles to the bottom left
            if (
              e.id < width * width - width &&
              !LHS &&
              props.gameBoard[e.id + width - 1].clicked == false
            ) {
              handleClick(props.gameBoard[e.id + width - 1]);
            }
            //Click tiles to the bottom right
            if (
              e.id < width * width - width &&
              !RHS &&
              props.gameBoard[e.id + width + 1].clicked == false
            ) {
              handleClick(props.gameBoard[e.id + width + 1]);
            }
          }
        }
        //If tiles are flagged then a click will unflag them
      } else {
        e.flagged = false;
        let flaggedTile = document.getElementById(e.id);
        flaggedTile.classList.remove("flagClicked");
        flagsAmount++;
      }
    }
  }

  //Right clicking calls the flag event
  function handleFlag(e) {
    //If game is still in progress
    if (!gameFinish) {
      //If tile is flagged a second click will remove the flag
      if (e.flagged) {
        e.flagged = false;
        flagsAmount++;
        let flaggedTile = document.getElementById(e.id);
        flaggedTile.remove("flagClicked");
      } else {
        //The available flags are equal to the amount of tiles that should be flagged
        //The number of flags cannot be exceeded and previous tiles must be unflagged
        if (flagsAmount > 0) {
          e.flagged = true;
          flagsAmount--;
          let flaggedTile = document.getElementById(e.id);
          flaggedTile.classList.add("flagClicked");
          //Correctly placed flags are recorded and if the total matches the total number of bombs the game is won
          if (e.type === "bomb") {
            goodFlags--;
            if (goodFlags === 0) {
              setTimeout(() => {
                gameFinish = true;
                gameResultMessage("flagged");
              }, 400);
            }
          }
        }
      }
    }
  }

  //Switch default text with text showing one of the three result conditions at game over
  function gameResultMessage(result) {
    let message = document.getElementById("message");
    if (result == "win") {
      message.innerHTML = "You won! <br /> All the safe tiles have been found";
    } else if (result == "flagged") {
      message.innerHTML =
        "You're a genius! <br /> All the bombs have been correctly flagged";
    } else {
      message.innerHTML = "You found a bomb! <br /> You lose";
    }
  }

  //Render a container with rules in text on the left. On the right a large grid of a consistant size, containing tiles of varying sizes depending on user input
  return (
    <Container className="mt-5 text-center border border-dark border-3 rounded p-2">
      <Row>
        <Col>
          <p className="fs-3">Minesweeper</p>
          <hr />
          <div className="my-5 row">
            {gameRules ? (
              <Rules setGameRules={setGameRules} />
            ) : (
              <Col xs={6}>
                <button
                  className="btn btn-info my-4"
                  onClick={() => setGameRules(true)}
                >
                  How to play
                </button>
              </Col>
            )}
            <Col xs={6}>
              <button
                className="btn btn-success my-4"
                onClick={() =>
                  props.setGameInputs({
                    ...props.gameInputs,
                    gameLoading: true,
                  })
                }
              >
                New Game
              </button>
            </Col>
          </div>
          {gameRules ? (
            ""
          ) : (
            <div className="fs-3 w-75 mx-auto" id="message">
              <p>
                The Microsoft version of Minesweeper was first released in 1990,
                as a way to help people learn how to use the mouse.
              </p>
            </div>
          )}
        </Col>
        <Col>
          <div className="outerGrid">
            <div className="d-flex flex-wrap mx-auto mainGrid">
              {props.gameBoard.map((e) => {
                return (
                  <Col key={e.id} xs={span}>
                    <div
                      id={e.id}
                      style={{
                        width: tileSize,
                        height: tileSize,
                      }}
                      className={"tile fs-3 text-danger"}
                      value={e.type}
                      onClick={() => handleClick(e)}
                      onContextMenu={() => handleFlag(e)}
                    ></div>
                  </Col>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameScreen;
