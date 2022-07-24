import { Card } from "react-bootstrap";

//Render a card showing the rules of the game
function Rules(props) {
  return (
    <Card className=" w-75 mx-auto">
      <div className="p-3 fs-3 text-start">
        <button
          className="btn btn-light float-end"
          onClick={() => props.setGameRules(false)}
        >
          Close
        </button>
        <p>Rules:</p>
      </div>
      <ul className="text-start fs-5">
        <li>
          Try to find all the bombs on this grid, flag the tiles you believe are
          bombs by right-clicking on the tile.
        </li>
        <li>
          To un-flag any tile, click on the tile with either the right or left
          mouse button.
        </li>
        <li>
          To win the game you must successfully flag all bomb tiles or otherwise
          reveal all other tiles that are not bombs.
        </li>
      </ul>
    </Card>
  );
}

export default Rules;
