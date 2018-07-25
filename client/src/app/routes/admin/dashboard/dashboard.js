import React, { Component } from 'react';
import Chart from './chart';
import { connect } from 'react-redux';
import './dashboard.css';  

class Dashboard extends Component {

  
  render() {
    return ( 
      <div className="admin-dashboard">
        <h1>Dashboard</h1>
        <div className="legend">
          <div>
            <div className="circle average"></div>
            Average
          </div>
          <div>
            <div className="circle times"></div>
            Api Call Times
          </div>
        </div>
        <svg>
          <Chart />
        </svg>
      </div>
    );
  }
}

export default connect(
  // (state) => ({}), 
  // (dispatch) => (bindActionCreators({}, dispatch))
)(Dashboard);
