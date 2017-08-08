import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import WorkspaceWrapper from './containers/workspace/WorkspaceWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <WorkspaceWrapper></WorkspaceWrapper>
        </Router>
      </div>
    );
  }
}

export default App;
