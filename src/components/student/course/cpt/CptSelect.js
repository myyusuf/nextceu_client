import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const CptSelect = ({ cpts, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Type"
    style={style}
    onSelect={onSelect}
    value={value}
  >
    {cpts.map(cpt => (
      <Option value={String(cpt.id)}>{cpt.name}</Option>
    ))}
  </Select>
);

CptSelect.propTypes = {
  cpts: PropTypes.arrayOf(
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
    cpts: state.studentReducers.cpts,
  }
);

const CptSelectWrapper = connect(
  mapStateToProps,
  null,
)(CptSelect);

export default CptSelectWrapper;
