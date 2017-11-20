import { ADD_ONE, SUB_ONE, FECTH_START, FECTH_SUCC, FECTH_FAIL } from './constants';


const reducer = (state, action) => {
	var newState = {...state};

	switch (action.type) {
		case ADD_ONE:
			newState.count++;
			return newState;
		case SUB_ONE: 
			newState.count--;
			return newState;
		case FECTH_START:
			newState.loading = action.loading;
			return newState;
		case FECTH_SUCC:
			newState.loading = action.loading;
			newState.payload = action.payload;
			newState.fetchAt = action.fetchAt;
			return newState;
		case FECTH_FAIL:
			newState.loading = action.loading;
			newState.errmsg = action.errmsg;
			return newState;
		default: return newState;
	}
};

export default reducer;