import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const PengampuSelect = ({ pengampus, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Pengampu"
    onSelect={onSelect}
    value={value}
    style={style}
  >
    {pengampus.map(pengampu => (
      <Option value={String(pengampu.id)}>{pengampu.name}</Option>
    ))}
  </Select>
);

PengampuSelect.propTypes = {
  pengampus: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

const mapStateToProps = state => (
  {
    pengampus: state.pengampuReducers.pengampusByDepartment,
  }
);

const PengampuSelectWrapper = connect(
  mapStateToProps,
  null,
)(PengampuSelect);

export default PengampuSelectWrapper;
