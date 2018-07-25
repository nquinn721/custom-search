import Service from '../service';

export const login = ({username, password}) => {
	return  async (dispatch) => {
		const { loggedIn, error } = await Service.post('/login', {username, password});
		dispatch({type: 'LOGIN', loggedIn, error});
	}
}

export const getApiCallTimes = () => {
	return async (dispatch) => {
		const callTimes = await Service.get('/api/api-call-times');
		dispatch({type: 'GET_API_CALL_TIMES', callTimes});
	}
}

export const setUsername = (username) => (dispatch) => dispatch({type: 'SET_USERNAME', username});
export const setPassword = (password) => (dispatch) => dispatch({type: 'SET_PASSWORD', password});
