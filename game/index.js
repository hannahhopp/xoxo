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
		if (winner) return winner + " is the winner!"
	}

	let counter = 0
	board.valueSeq().forEach( x => x.forEach( j => counter++))
	return counter === 9 ? 'DRAW' : undefined
}

function turnReducer(turn = 'X', action) {
	let newTurn = turn === 'X' ? 'O' : 'X'
	if (action.type === 'move') {
		return newTurn
	}
	return turn
}

function boardReducer(board = Map(), action) {
	if (action.type === 'move') {
		return board.setIn(action.position, action.turn)
	}
	return board
}

export default function reducer(state = {}, action) {
	const nextBoard = boardReducer(state.board, action)
	const isWin = winner(nextBoard)
	return {
		board: nextBoard,
		turn: turnReducer(state.turn, action),
		winner: isWin
	}
}
