import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const ScoreTypeSelect = ({ scoreTypes, value, onSelect, style }) => (
  <Select
    placeholder="Select Score Type"
    onSelect={onSelect}
    value={value}
    style={style}
    defaultActiveFirstOption
  >
    {scoreTypes.map(scoreType => (
      <Option key={scoreType.id} value={String(scoreType.id)}>{scoreType.name}</Option>
    ))}
  </Select>
);

ScoreTypeSelect.propTypes = {
  scoreTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    scoreTypes: state.studentReducers.scoreTypes,
  }
);

const ScoreTypeSelectWrapper = connect(
  mapStateToProps,
  null,
)(ScoreTypeSelect);

export default ScoreTypeSelectWrapper;
