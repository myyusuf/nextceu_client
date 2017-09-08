import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const PftSelect = ({ pfts, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Type"
    style={style}
    onSelect={onSelect}
    value={value}
  >
    {pfts.map(pft => (
      <Option value={String(pft.id)}>{pft.name}</Option>
    ))}
  </Select>
);

PftSelect.propTypes = {
  pfts: PropTypes.arrayOf(
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
    pfts: state.studentReducers.pfts,
  }
);

const PftSelectWrapper = connect(
  mapStateToProps,
  null,
)(PftSelect);

export default PftSelectWrapper;
