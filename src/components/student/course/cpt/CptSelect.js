import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const CptSelect = ({ cpts, value, onSelect }) => (
  <Select
    placeholder="Select Type"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    {cpts.map(cpt => (
      <Option value={cpt.id}>{cpt.name}</Option>
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
