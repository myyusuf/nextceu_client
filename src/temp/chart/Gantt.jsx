import React, { Component } from 'react';
import 'dhtmlx-gantt';
// import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
  componentDidMount() {
    gantt.init(this.ganttContainer);
    // gantt.parse(this.props.tasks);
  }

  componentWillReceiveProps(nextProps) {
    gantt.clearAll();
    gantt.parse(nextProps.tasks);
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
