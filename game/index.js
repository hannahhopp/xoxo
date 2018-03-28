import { Map } from 'immutable'

export const move = (turn, position) => {
	return {
		type: 'move',
		turn: turn,
		position: position
	}
}
const initialState = { board: Map(), turn: 'X' }

const streak = (board, ...coord) => {
	
	let player = board.hasIn(coord[0])
	if (player === "_") {
		return undefined
	}

	for (let i = 1; i < coord.length; i++) {
		if (board.hasIn(coord[i]) !== player) {
			return undefined
		}
	}
	return player
}

const winner = () => {
	
}


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
