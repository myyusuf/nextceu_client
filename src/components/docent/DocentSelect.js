import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const DocentSelect = ({ docents, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Docent"
    onSelect={onSelect}
    value={value}
    style={style}
  >
    {docents.map(docent => (
      <Option value={String(docent.id)}>{docent.name}</Option>
    ))}
  </Select>
);

DocentSelect.propTypes = {
  docents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

const mapStateToProps = state => (
  {
    docents: state.docentReducers.allDocents,
  }
);

const DocentSelectWrapper = connect(
  mapStateToProps,
  null,
)(DocentSelect);

export default DocentSelectWrapper;
