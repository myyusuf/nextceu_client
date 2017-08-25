import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './SettingsMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import SettingsTree from '../../components/settings/SettingsTree';
import ParticipantList from '../../components/seminar/ParticipantList';

const SettingsMain = () => (
  <div>
    <Row>
      <Col span={6}>
        <SettingsTree />
      </Col>
      <Col span={18} style={{ backgroundColor: '#fff' }}>
        <ParticipantList />
      </Col>
    </Row>
  </div>
);

SettingsMain.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
};

// const mapStateToProps = state => (
//   {
//   }
// );

const mapDispatchToProps = dispatch => (
  {
    filterStudents: level => (
      dispatch(filterStudentsByLevelText(level))
    ),
    openAddWindow: () => (
      dispatch({
        type: 'ADD_HOSPITAL_LOGIC',
      })
    ),
  }
);

const SettingsMainWrapper = connect(
  null,
  mapDispatchToProps,
)(SettingsMain);

export default SettingsMainWrapper;
