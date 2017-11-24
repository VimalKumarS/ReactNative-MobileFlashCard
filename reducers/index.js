import * as actions from '../actions'

function decks(state = {}, action) {
	switch (action.type) {
		case actions.ADD_DECK:
			return { ...state, ...action.data }
		case actions.GET_DECKS:
			return { ...state, ...action.data }
		case actions.ADD_QUESTION:
		
			return {...state,...action.data}
		default:
			return state
	}
}

export default decks