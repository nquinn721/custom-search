import React, { Component } from 'react';
import * as d3 from "d3";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getApiCallTimes } from '../../../redux/actions/admin';
import './chart.css';



class Chart extends Component{
  state = {};

  async componentDidMount(){
    await this.props.getApiCallTimes();
  }
  render(){
    const { callTimes } = this.props.admin;

    if(callTimes){
        this.createChart(this.props.admin.callTimes);
        return <div>Chart</div>;
    }

    return <div></div>;
  }
  createChart(callTimes){ 
    const margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = 800 - margin.left - margin.right 
        , height = 600 - margin.top - margin.bottom; 


    const xScale = d3.scaleLinear()
        .domain([0, callTimes.length]) 
        .range([0, width]); 

    const yScale = d3.scaleLinear()
        .domain([0, Math.max.apply(Math, callTimes.map(d => d.apiCallTime)) + 100]) 
        .range([height, 0]); 

    const line = d3.line()
        .x((d, i) => xScale(i)) 
        .y((d) => yScale(d.y)) 
        .curve(d3.curveMonotoneX) 

    const dataset = callTimes.map(d => ({"y": d.apiCallTime}));
    const average = callTimes.map(d => d.apiCallTime).reduce((a, b) => a + b) / callTimes.length;

    const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); 

    svg.append("g")
        .attr("class", "y axis") 
        .call(d3.axisLeft(yScale)); 

    svg.append("path")
        .datum(dataset) 
        .attr("class", "line") 
        .attr("d", line); 

    svg.append("path")
        .datum(callTimes.map(d => ({"y": average}))) 
        .attr("class", "average-line")  
        .attr("d", line); 

    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") 
        .attr("class", "dot") 
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
          .on("mouseover", (a, b, c) => { 
            console.log(a) 
            this.attr('class', 'focus')
        })

  }

}

export default connect(
  (state) => ({admin: state.admin}), 
  (dispatch) => (bindActionCreators({getApiCallTimes}, dispatch))
)(Chart);
