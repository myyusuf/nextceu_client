import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const TutorSelect = ({ tutors, value, onChange, style }) => (
  <Select
    placeholder="Select Tutor"
    onChange={onChange}
    value={value}
    style={style}
    allowClear
  >
    {tutors.map(tutor => (
      <Option value={String(tutor.id)}>{tutor.name}</Option>
    ))}
  </Select>
);

TutorSelect.propTypes = {
  tutors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape(),
};

TutorSelect.defaultProps = {
  style: {},
};

const mapStateToProps = state => (
  {
    tutors: state.tutorReducers.tutorsForSelect,
  }
);

const TutorSelectWrapper = connect(
  mapStateToProps,
  null,
)(TutorSelect);

export default TutorSelectWrapper;
