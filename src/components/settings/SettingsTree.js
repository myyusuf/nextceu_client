import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tree from 'antd/lib/tree';

const TreeNode = Tree.TreeNode;

const SettingsTree = ({ selectSettings }) => (
  <div
    style={{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e9e9e9',
      padding: 15,
    }}
  >
    <Tree
      onSelect={selectSettings}
      defaultExpandedKeys={['1', '2']}
    >
      <TreeNode title="Application" key="1">
        <TreeNode title="Department" key="1-1" />
      </TreeNode>
      <TreeNode title="Security" key="2">
        <TreeNode title="User" key="2-1" />
        <TreeNode title="Role" key="2-2" />
      </TreeNode>
    </Tree>
  </div>
);

SettingsTree.propTypes = {
  selectSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    selectSettings: (key) => {
      if (key && key[0]) {
        dispatch({
          type: 'SELECT_MENU_KEY',
          payload: key[0],
        });
      }
    },
  }
);

const SettingsTreeWrapper = connect(
  null,
  mapDispatchToProps,
)(SettingsTree);

export default SettingsTreeWrapper;
