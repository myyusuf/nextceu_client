import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './SeminarMain.css';
import SeminarList from '../../components/seminar/SeminarList';
import ParticipantList from '../../components/seminar/ParticipantList';

const SeminarMain = () => (
  <div>
    <Row>
      <Col span={10}>
        <SeminarList />
      </Col>
      <Col span={14} style={{ backgroundColor: '#fff' }}>
        <ParticipantList />
      </Col>
    </Row>
  </div>
);

SeminarMain.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
};

// const mapStateToProps = state => (
//   {
//   }
// );

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'ADD_HOSPITAL_LOGIC',
      })
    ),
  }
);

const SeminarMainWrapper = connect(
  null,
  mapDispatchToProps,
)(SeminarMain);

export default SeminarMainWrapper;
