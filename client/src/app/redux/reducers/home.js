const initialState = {
	companies: [{}]
};


export default (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_COMPANY':
			state.companies[action.companyIndex] = action.companyName;
			return state;
		case 'ADD_COMPANY':
			state.error = false;
			state.companies = state.companies.concat([{}]);
			return state;
		case 'GET_DOMAINS':
			action.domains && action.domains[0].error ? state.error = true : state.error = false;
			state.companies = action.domains;
			return state;
		default:
			return state;
	}
}