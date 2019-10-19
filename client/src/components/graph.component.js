import React, { Component } from 'react';
import axios from 'axios';
import { ColumnChart } from 'react-chartkick'
import 'chart.js'

export default class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      assists: 0,
      rebounds: 0
    }
  }
  
  // checks every 10 seconds for updated score from the api
  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    axios.get('/score')
      .then(val => {
        this.setState({
          points: val.data.points,
          assists: val.data.assists,
          rebounds: val.data.rebounds
        })
      })
  }

  render() {
    return (
      <div>
        <h3>Check the latest Scores(updates every 10 seconds)</h3>
        <div>
          <ColumnChart data={[["Points", this.state.points], ["Assists", this.state.assists], ["Rebounds", this.state.rebounds]]} />
        </div>
      </div>
    );
  }
}