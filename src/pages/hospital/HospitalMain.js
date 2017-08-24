import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';

import './HospitalMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import HospitalList from '../../components/hospital/HospitalList';
import HospitalDetailsPage from './HospitalDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class HospitalMain extends Component {

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={4} offset={8}>
            <RangePicker
              onChange={(date, dateString) => {
                this.handleInputChange('planDate', date);
              }}
            />
          </Col>
          <Col span={4}>
            <Select defaultValue="lucy" style={{ width: 120, marginBottom: 20 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>

        <Row>
          <Col span={17}>
            <HospitalList />
          </Col>
          <Col span={7} style={{ backgroundColor: '#fff' }}>
            <HospitalDetailsPage />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
    studentFilter: state.studentReducers.studentFilter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    filterStudents: level => (
      dispatch(filterStudentsByLevelText(level))
    ),
  }
);

const HospitalMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalMain);

export default HospitalMainWrapper;
