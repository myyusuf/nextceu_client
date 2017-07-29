import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './components/pages/student/StudentList';

const students = [
  {
    id: 1,
    name: 'Student Test 1',
  }
];


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <StudentList students={students}></StudentList>
        </p>
      </div>
    );
  }
}

export default App;
