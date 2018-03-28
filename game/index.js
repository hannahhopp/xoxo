import { Map } from 'immutable'

export const move = (turn, position) => {
	return {
		type: 'move',
		turn: turn,
		position: position
	}
}
const initialState = { board: Map(), turn: 'X' }

export default function reducer(state = initialState, action) {
	let newTurn = action.turn === 'X' ? 'O' : 'X'
	switch (action.type) {
		case 'move':
			return {
				board: state.board.setIn(action.position, state.turn),
				turn: newTurn
			}
		default:
			return state
	}
}
