import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const gantt = window.gantt;

export default class Gantt extends Component {
  componentDidMount() {
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }

  componentWillReceiveProps(nextProps) {
    try {
      gantt.clearAll();
      gantt.parse(nextProps.tasks);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}
