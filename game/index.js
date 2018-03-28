import {Map} from 'immutable'

let board = Map()



export default function reducer(state = { board: board, turn: "X"}, action) {
  // TODO
  let newTurn = turn === "X" ? "O" : "X"
  
  switch (action.type) {
    case "move":
      return { board: board.setIn(action.position, action.player),  }
    default:
      return state;
  }
}

