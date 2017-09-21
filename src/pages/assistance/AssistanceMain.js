import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import AssistanceList from '../../components/assistance/AssistanceList';
import ParticipantList from '../../components/assistance/ParticipantList';

const AssistanceMain = () => (
  <div>
    <Row>
      <Col span={10}>
        <AssistanceList />
      </Col>
      <Col span={14} style={{ backgroundColor: '#fff' }}>
        <ParticipantList />
      </Col>
    </Row>
  </div>
);

AssistanceMain.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
};

// const mapStateToProps = state => (
//   {
//   }
// );

// const mapDispatchToProps = dispatch => (
//   {
//     openAddWindow: () => (
//       dispatch({
//         type: 'ADD_HOSPITAL_LOGIC',
//       })
//     ),
//   }
// );

// const AssistanceMainWrapper = connect(
//   null,
//   null,
// )(AssistanceMain);
//
// export default AssistanceMainWrapper;

export default AssistanceMain;
