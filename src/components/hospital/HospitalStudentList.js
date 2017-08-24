import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HospitalStudentListItem from './HospitalStudentListItem';

const HospitalStudentList = ({ hospitalStudents }) => (
  <div>
    {hospitalStudents.map(student => (
      <HospitalStudentListItem student={student} />
    ))}
  </div>
);

HospitalStudentList.propTypes = {
  hospitalStudents: PropTypes.arrayOf(PropTypes.shape({
    oldSid: PropTypes.string.isRequired,
    newSid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    hospitalStudents: state.hospitalReducers.hospitalStudents,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);

const HospitalStudentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalStudentList);

export default HospitalStudentListWrapper;
