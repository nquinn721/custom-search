import Service from '../service';

export const updateCompany = (companyName, companyIndex) => {
	return  (dispatch) => dispatch({type: 'UPDATE_COMPANY', companyName, companyIndex});
}

export const addCompany = () => {
	return (dispatch) => dispatch({type: 'ADD_COMPANY'});
};

export const getDomains = (companies) => {
	return async (dispatch) => {
		const domains = await Service.post('/api/companies', {companies});
		dispatch({type: 'GET_DOMAINS', domains})
	}
}