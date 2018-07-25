const initialState = {
  	loggedIn: false,
  	username: 'nate',
  	password: 'nate123'
};


export default (state = initialState, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				...state,
				loggedIn: action.loggedIn,
				error: action.error
			}
		case 'SET_USERNAME':
			return {
				...state,
				error: false,
				username: action.username
			}
		case 'SET_PASSWORD':
			return {
				...state,
				error: false,
				password: action.password
			}
		case 'GET_API_CALL_TIMES':
			return {
				...state,
				callTimes: action.callTimes
			}
		default:
			return state;
	}
}