const initialState = {
	companies: [{}]
};


export default (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_COMPANY':
			state.companies[action.companyIndex].name = action.companyName;
			return {
				...state,
				error: false
			}
		case 'ADD_COMPANY':
			state.companies.push({});
			return {
				...state,
				error: false,
			}
		case 'GET_DOMAINS':
			return {
				...state,
				companies: action.domains,
				error: action.domains && action.domains[0].error
			}
		default:
			return state;
	}
}