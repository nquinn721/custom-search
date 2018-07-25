import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsername, setPassword, login } from '../../redux/actions/admin';
import './admin.css'; 

class Admin extends Component {


  render() {
    const { admin, setPassword, setUsername, login } = this.props;
  	let component;

    if(admin.loggedIn){
    	component = <Dashboard />;
    }else{
  		component = (
  			<div className="admin">
  				<div className="login panel panel-primary">
  					<div className="panel-heading">Login {admin.error && <div className="alert alert-danger">{admin.error}</div>}</div>
  					<div className="panel-body">
  						<input className="form-control" placeholder="username" value={admin.username} onChange={e => setUsername(e.target.value)}/>
  						<input className="form-control" placeholder="password" type="password" value={admin.password} onChange={e => setPassword(e.target.value)}/>
  						<button className="btn btn-primary" onClick={() => login(admin)}>Login</button>
  					</div>
  				</div>
  			</div>
  		);
    }
    
    return component;
  }
}

export default connect(
  (state) => ({admin: state.admin}), 
  (dispatch) => (bindActionCreators({setUsername, setPassword, login}, dispatch))
)(Admin);
