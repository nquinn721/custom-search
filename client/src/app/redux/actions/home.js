import Service from '../service';


// async getCompanies(){
//   	const companies = await Service.post('/api/companies', this.state);
//     if(companies[0].error){
//         this.setState(companies[0]);
//     }else{
//     	 this.setState({companies});
//     }
//   }

 

  

export const updateCompany = (companyName, companyIndex) => {
	return  (dispatch) => dispatch({type: 'UPDATE_COMPANY', companyName, companyIndex});
}


export const addCompany = () => {
	return (dispatch) => dispatch({type: 'ADD_COMPANY'});
};

export const getDomains = async (companies) => {
	const domains = await Service.post('/api/companies', companies);
	return (dispatch) => dispatch({type: 'GET_DOMAINS', domains})
}