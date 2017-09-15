import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tree from 'antd/lib/tree';
import * as actions from '../../actions/ActionType';

const TreeNode = Tree.TreeNode;

const BakordikTree = ({ selectBakordik, selectedKeys }) => (
  <div
    style={{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e9e9e9',
      padding: 15,
      height: 600,
    }}
  >
    <Tree
      onSelect={selectBakordik}
      selectedKeys={selectedKeys}
      defaultExpandedKeys={['1', '2', '3']}
    >
      <TreeNode title="Students" key="1">
        <TreeNode title="Initiate" key="1-1" />
      </TreeNode>
    </Tree>
  </div>
);

BakordikTree.propTypes = {
  selectBakordik: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    selectedKeys: [state.bakordikReducers.selectedMenuKey],
  }
);

const mapDispatchToProps = dispatch => (
  {
    selectBakordik: (key) => {
      if (key && key[0]) {
        dispatch({
          type: actions.bakordik.treeSelect,
          payload: key[0],
        });
      }
    },
  }
);

const BakordikTreeWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BakordikTree);

export default BakordikTreeWrapper;
