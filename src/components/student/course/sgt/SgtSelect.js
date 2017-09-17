import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const SgtSelect = ({ sgts, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Type"
    style={style}
    onSelect={onSelect}
    value={value}
  >
    {sgts.map(sgt => (
      <Option value={String(sgt.id)}>{sgt.name}</Option>
    ))}
  </Select>
);

SgtSelect.propTypes = {
  sgts: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

const mapStateToProps = state => (
  {
    sgts: state.studentReducers.sgts,
  }
);

const SgtSelectWrapper = connect(
  mapStateToProps,
  null,
)(SgtSelect);

export default SgtSelectWrapper;
