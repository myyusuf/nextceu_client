import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const SmtSelect = ({ smts, value, onChange, style = {} }) => (
  <Select
    placeholder="Select Type"
    style={style}
    onChange={onChange}
    value={value}
    allowClear
  >
    {smts.map(smt => (
      <Option value={String(smt.id)}>{smt.name}</Option>
    ))}
  </Select>
);

SmtSelect.propTypes = {
  smts: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape(),
};

const mapStateToProps = state => (
  {
    smts: state.seminarReducers.smtsByDepartment,
  }
);

const SmtSelectWrapper = connect(
  mapStateToProps,
  null,
)(SmtSelect);

export default SmtSelectWrapper;
