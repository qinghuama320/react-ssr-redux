import { ADD_ONE, SUB_ONE } from './constants';


const reducer = (state, action) => {
	var newState = {...state};

	switch (action.type) {
		case ADD_ONE:
			newState.count++;
			return newState;
		case SUB_ONE: 
			newState.count--;
			return newState;
		default: return newState;
	}
};

export default reducer;