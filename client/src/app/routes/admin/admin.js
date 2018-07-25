import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard';
import { connect } from 'react-redux';
import './admin.css'; 

class Admin extends Component {
  state = {
  	loggedIn: false,
  	username: 'nate',
  	password: 'nate123'
  };

  constructor(){
  	super();

  	this.login = this.login.bind(this);
  } 

  async login(){
  	// const { loggedIn, error } = await Service.post('/login', this.state);

  	// this.setState({loggedIn, error});
  }
  
  setUsername(username){
  	// this.setState({username});
  }

  setPassword(password){
  	// this.setState({password});
  }

  render() {
  	let component;


    if(this.state.loggedIn){
    	component = <Dashboard />;
    }else{
  		component = (
  			<div className="admin">
  				<div className="login panel panel-primary">
  					<div className="panel-heading">Login {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}</div>
  					<div className="panel-body">
  						<input className="form-control" placeholder="username" value={this.state.username} onChange={e => this.setUsername(e.target.value)}/>
  						<input className="form-control" placeholder="password" type="password" value={this.state.password} onChange={e => this.setPassword(e.target.value)}/>
  						<button className="btn btn-primary" onClick={this.login}>Login</button>
  					</div>
  				</div>
  			</div>
  		);
    }
    
    return component;
  }
}

export default connect(
  // (state) => ({}), 
  // (dispatch) => (bindActionCreators({}, dispatch))
)(Admin);
