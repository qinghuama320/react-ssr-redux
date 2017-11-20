import { ADD_ONE, SUB_ONE, FECTH_START, FECTH_SUCC, FECTH_FAIL } from './constants';
import 'isomorphic-fetch';

export const addAction = {
	type: ADD_ONE
}

export const subAction = {
	type: SUB_ONE
}

const fecthStart = () => ({
	type: FECTH_START,
	loading: true
});

const fetchSucc = (json) => ({
	type: FECTH_SUCC,
	payload: json,
	fetchAt: Date.now(),
	loading: false
});

const fetchFail = () => ({
	type: FECTH_FAIL,
	errmsg: '获取列表失败',
	loading: false
})

export const fecthAsynAction = () => {
	return (dispatch, getState) => {
		dispatch(fecthStart());
		console.log('fecthAsynAction');

		const fullUrl = 'http://127.0.0.1:3001/api/movie/top250?count=1'; //必须是全URL，否则在服务端fetch会失败。。================编程技巧4================
		const headers = new Headers();
		headers.append('Content-type', 'application/json; charset=UTF-8');

		return fetch(fullUrl)
			.then(res => res.json())
			.then(res => {
				//console.log(res);
				dispatch(fetchSucc(res));
			}, e => {
				//console.log(e);
				dispatch(fetchFail());
			});
	}
}