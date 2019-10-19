import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      message:""
    }

    this.resetState = this.resetState.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  // sets the message to null
  resetState(){
    this.setState({
      message:""
    }) ;
  }

  // sets the message in the state after confirming the database has been reset
  onClear(e){
    axios.get('/delete')
    .then(res => {
      if(res.data=="Documents Deleted"){
        this.setState({
          message:"All data has been reset!"
        })
        setInterval(this.resetState, 3000);
      }
    })
    
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/input" className="navbar-brand">Update Score</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/graph" className="nav-link">Graph</Link>
          </li>
          <li className="navbar-item">
          <input type="submit" onClick={this.onClear} value="Clear Database" className="btn btn-danger btn-md" />
          </li>
        </ul>
        {
            this.state.message=="All data has been reset!"?<span class="navbar-text">
            {this.state.message}
          </span>:null
          }
        </div>
      </nav>
    );
  }
}