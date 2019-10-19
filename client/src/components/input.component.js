import React, { Component } from 'react';
import axios from 'axios';

export default class Input extends Component {

  constructor(props) {
    super(props);

    this.onChangeAssists = this.onChangeAssists.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);
    this.onChangeRebounds = this.onChangeRebounds.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      points: null,
      assists: null,
      rebounds: null,
      message:""
    }
  }

  // sets the value of the state values to the entered values in the form
  onChangePoints(e) {
    this.setState({
      points: e.target.value
    })
  }
  onChangeAssists(e) {
    this.setState({
      assists: e.target.value
    })
  }
  onChangeRebounds(e) {
    this.setState({
      rebounds: e.target.value
    })
  }

  
  resetState(){
    this.setState({
      message:""
    }) ;
  }

// sends the form inputs to the api
  onSubmit(e) {
    e.preventDefault();
    const newScore = {
      points: parseInt(this.state.points),
      assists: parseInt(this.state.assists),
      rebounds: parseInt(this.state.rebounds)
    }

    axios.post('/update', newScore)
      .then(res => {
        if(res.data=="Stat Added"){
          this.setState({
            message:"Your stat has been added successfully!"
          })
          setInterval(this.resetState, 2000);
        }
      });

    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Update the Score</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Points: </label>
            <input type="number"
              required
              className="form-control"
              value={this.state.points}
              onChange={this.onChangePoints}
            />
          </div>
          <div className="form-group">
            <label>Assists: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.assists}
              onChange={this.onChangeAssists}
            />
          </div>
          <div className="form-group">
            <label>Rebounds: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.rebounds}
              onChange={this.onChangeRebounds}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Update Score" className="btn btn-primary" />&nbsp;
          </div>

          {
            this.state.message=="Your stat has been added successfully!"?<div class="alert alert-success">
            <strong>{this.state.message}</strong>
          </div>:null
          }
          
        </form>
      </div>
    );
  }
}