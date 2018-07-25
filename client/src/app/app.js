import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './routes/home/home';
import Admin from './routes/admin/admin';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  render() {
    return (
       <Router>
        <div className="app"> 
          <div className="app-header">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <Link to="/admin">Admin</Link>
            </span>
          </div>

          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  // (state) => ({}), 
  // (dispatch) => (bindActionCreators({}, dispatch))
)(App);
