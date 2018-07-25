import React, { Component } from 'react';
import { table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCompany, addCompany, getDomains } from '../../redux/actions/home';
import './home.css';

class Home extends Component {


  render() {
  	let rows = [];
  	this.props.companies.forEach( (company, index) => 
  		rows.push(
  			<tr key={index} className="company">
  				<td width="50%">
  					<input className="form-control company-name" value={company.name} onChange={e => this.props.updateCompany(e.target.value, index)}/>
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
        <button className="btn btn-primary get-domains" onClick={this.props.getDomains}>Get Domains</button>
    		<button className="btn btn-info add-company" onClick={this.props.addCompany}>Add Company</button>
        {this.props.home.error && <div className="alert alert-danger">{this.props.home.error}</div>}
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
  (state) => ({home: state.home.companies}), 
  (dispatch) => (bindActionCreators({updateCompany, addCompany, getDomains}, dispatch))
)(Home);
