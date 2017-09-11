import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const UptSelect = ({ upts, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Type"
    style={style}
    onSelect={onSelect}
    value={value}
  >
    {upts.map(upt => (
      <Option value={String(upt.id)}>{upt.name}</Option>
    ))}
  </Select>
);

UptSelect.propTypes = {
  upts: PropTypes.arrayOf(
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
    upts: state.ukmppdReducers.upts,
  }
);

const UptSelectWrapper = connect(
  mapStateToProps,
  null,
)(UptSelect);

export default UptSelectWrapper;
