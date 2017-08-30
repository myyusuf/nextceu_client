import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

const Column = Table.Column;

const HospitalStudentList = ({ hospitalStudents, loading }) => (
  <div style={{ paddingLeft: 15, paddingRight: 15 }}>
    <Table dataSource={hospitalStudents} style={{ marginTop: 20 }} rowKey="id" loading={loading}>
      <Column
        title="Old SID"
        dataIndex="oldSid"
      />
      <Column
        title="Name"
        dataIndex="Name"
      />
    </Table>
  </div>
);

HospitalStudentList.propTypes = {
  hospitalStudents: PropTypes.arrayOf(PropTypes.shape({
    oldSid: PropTypes.string.isRequired,
    newSid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    hospitalStudents: state.hospitalReducers.hospitalStudents,
    loading: state.hospitalReducers.hospitalStudentSearch.loading,
  }
);

const HospitalStudentListWrapper = connect(
  mapStateToProps,
  null,
)(HospitalStudentList);

export default HospitalStudentListWrapper;
