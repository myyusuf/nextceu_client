import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import StudentMain from './pages/student/StudentMain';
import SeminarMain from './pages/seminar/SeminarMain';
import HospitalMain from './pages//hospital/HospitalMain';
import SettingsMain from './pages/settings/SettingsMain';
import ReportMain from './pages/report/ReportMain';
import BakordikMain from './pages/bakordik/BakordikMain';

import Workspace from './pages/workspace/Workspace';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Workspace>
            <Route exact path="/" component={StudentMain} />
            <Route path="/hospitals" component={HospitalMain} />
            <Route path="/seminars" component={SeminarMain} />
            <Route path="/settings" component={SettingsMain} />
            <Route path="/reports" component={ReportMain} />
            <Route path="/bakordik" component={BakordikMain} />
          </Workspace>
        </Router>
      </div>
    );
  }
}

export default App;
