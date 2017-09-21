import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import StudentMain from './pages/student/StudentMain';
import AssistanceMain from './pages/assistance/AssistanceMain';
import SeminarMain from './pages/seminar/SeminarMain';
import HospitalMain from './pages//hospital/HospitalMain';
import SettingsMain from './pages/settings/SettingsMain';
import ReportMain from './pages/report/ReportMain';
import BakordikMain from './pages/bakordik/BakordikMain';

import Workspace from './pages/workspace/Workspace';

class App extends Component {
  render() {
    const role = window.sessionStorage.getItem('role');
    let componentToRender = (
      <Workspace>
        <Route exact path="/" component={StudentMain} />
        <Route path="/hospitals" component={HospitalMain} />
        <Route path="/seminars" component={SeminarMain} />
        <Route path="/assistances" component={AssistanceMain} />
        <Route path="/settings" component={SettingsMain} />
        <Route path="/reports" component={ReportMain} />
      </Workspace>
    );

    if (role === 'BAKORDIK') {
      componentToRender = (
        <Workspace>
          <Route exact path="/" component={BakordikMain} />
        </Workspace>
      );
    }
    return (
      <div className="App">
        <Router>
          {componentToRender}
        </Router>
      </div>
    );
  }
}

export default App;
