import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function SetterScreen(props) {
  const [span, setSpan] = React.useState(2);
  const [bombs, setBombs] = React.useState(0.2);

  //Render a container div with a form element responsible for collecting variables controlling number of tiles in the grid and percentage of bombs in the grid. On the right showing a simple text message.
  return (
    <Container className="mt-5 text-center border-secondary border rounded border-3">
      <p className="fs-2 my-3">Minesweeper</p>
      <hr />
      <Row>
        <Col>
          <form>
            <Container className="my-4 fs-4">
              <Row>
                <Col>
                  <label>Size of grid :</label>
                </Col>
                <Col>
                  <select
                    defaultValue={2}
                    onChange={(e) => setSpan(e.target.value)}
                  >
                    <option value={1}>Big</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Small</option>
                    <option value={4}>Silly</option>
                  </select>
                </Col>
              </Row>
            </Container>
            <Container className="my-4 fs-4">
              <Row>
                <Col>
                  <label>Bombs :</label>
                </Col>
                <Col>
                  <select
                    defaultValue={0.2}
                    onChange={(e) => setBombs(e.target.value)}
                  >
                    <option value={0.5}>A crazy amount</option>
                    <option value={0.25}>A lot</option>
                    <option value={0.2}>A normal amount</option>
                    <option value={0.1}>A few</option>
                    <option value={0.01}>Just 1</option>
                  </select>
                </Col>
              </Row>
            </Container>
            <Container className="my-4 ">
              <button
                className="btn btn-warning fs-5"
                type="submit"
                onClick={() =>
                  props.setGameInputs({
                    span: span,
                    bombs: bombs,
                    gameLoading: false,
                  })
                }
              >
                Generate Game
              </button>
            </Container>
          </form>
        </Col>
        <Col>
          <div className="p-4">
            <p className="fs-5">
              I built this version of Minesweeper using React.js. The project
              displays use arrays, loops, props and state, to pass variable
              between parents and children. It also uses recursion to check
              neighboring tiles, which is quite pleasing. <br />
              Images are sourced from royalty free image sharing site{" "}
              <a href="https://www.pexels.com/">Pexels</a>, or created from
              scratch.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SetterScreen;
