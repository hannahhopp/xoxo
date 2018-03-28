import {Map} from 'immutable'

let board = Map()

export const move = (turn, position) => {
  return {
    type: 'move',
    position: position,
    turn: turn
  };
}

export default function reducer(state = { board: board, turn: "X"}, action) {
  //let newTurn = action.turn === "X" ? "O" : "X";
  switch (action.type) {
    case "move":
      return { board: board.setIn(action.position), turn: "X" }
    default:
      return state;
  }
}

