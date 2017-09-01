import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import StudentMain from './pages/student/StudentMain';
import HospitalMain from './pages//hospital/HospitalMain';
import SettingsMain from './pages/settings/SettingsMain';

import Workspace from './pages/workspace/Workspace';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Workspace>
            <Route path="/students" component={StudentMain} />
            <Route path="/hospitals" component={HospitalMain} />
            <Route path="/settings" component={SettingsMain} />
          </Workspace>
        </Router>
      </div>
    );
  }
}

export default App;
