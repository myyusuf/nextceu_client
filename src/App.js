import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import StudentList from './components/pages/student/StudentList';
import StudentListContainer from './containers/StudentListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StudentListContainer></StudentListContainer>
      </div>
    );
  }
}

export default App;
