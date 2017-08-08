import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import Workspace from './components/pages/workspace';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Workspace></Workspace>
        </Router>
      </div>
    );
  }
}

export default App;
