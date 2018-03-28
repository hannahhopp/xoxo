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
	let player = board.getIn(coord[0])
	if (player === '_') {
		return undefined
	}

	for (let i = 1; i < coord.length; i++) {
		if (board.getIn(coord[i]) !== player) {
			return undefined
		}
	}
	return player
}

export const winner = board => {
	const horiz1 = [[0, 0], [0, 1], [0, 2]]
	const horiz2 = [[1, 0], [1, 1], [1, 2]]
	const horiz3 = [[2, 0], [2, 1], [2, 2]]
	const vert1 = [[0, 0], [1, 0], [2, 0]]
	const vert2 = [[0, 1], [1, 1], [2, 1]]
	const vert3 = [[0, 2], [1, 2], [2, 2]]
	const diag1 = [[0, 0], [1, 1], [2, 2]]
	const diag2 = [[0, 2], [1, 1], [2, 0]]
	const coords = [horiz1, horiz2, horiz3, vert1, vert2, diag1, diag2]
	for (let dir of coords) {
		const winner = streak(board, ...dir)
		if (winner) return winner
	}
	console.log(board.toArray().length)
	return board.toArray().length === 9 ? 'DRAW' : undefined
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
