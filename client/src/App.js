import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Navbar from "./components/navbar.component";
import Input from "./components/input.component";
import Graph from "./components/graph.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <br/>
        <Row>
          <Col><Input/></Col>
          <Col><Route path="/graph" component={Graph} /></Col>
        </Row>
       
        {/* <Route path="/input" component={Input} /> */}
        
       </Router> 
    );
  }
}

export default App;
