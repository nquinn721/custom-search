import React, { Component } from 'react';
import { table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCompany, addCompany, getDomains } from '../../redux/actions/home';
import './home.css';

class Home extends Component {


  render() {
    const { home, getDomains, addCompany, updateCompany } = this.props,
          rows = [];

  	home.companies.forEach( (company, index) => 
  		rows.push(
  			<tr key={index} className="company">
  				<td width="50%">
  					<input className="form-control company-name" value={company.name} onChange={e => updateCompany(e.target.value, index)}/>
  				</td>
  				<td id="domain">
  					<span>{company.domain}</span>
  				</td> 
  			</tr>
  		)
  	);

    return (
      <div className="home">
        <h1>Home</h1>
        <button className="btn btn-primary get-domains" onClick={() => getDomains(home.companies)}>Get Domains</button>
    		<button className="btn btn-info add-company" onClick={addCompany}>Add Company</button>
        {this.props.home.error && <div className="alert alert-danger">{home.error}</div>}
        <table className="table table-striped">
        	<thead>
        		<tr>
        			<td>Company</td>
	        		<td>Domain</td>
	        	</tr>
        	</thead>
        	<tbody>
        		{rows}
        	</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => ({home: state.home}), 
  (dispatch) => (bindActionCreators({updateCompany, addCompany, getDomains}, dispatch))
)(Home);
