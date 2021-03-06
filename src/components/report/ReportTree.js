import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tree from 'antd/lib/tree';

const TreeNode = Tree.TreeNode;

const SettingsTree = ({ selectSettings, selectedKeys }) => (
  <div
    style={{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e9e9e9',
      padding: 15,
      height: 680,
      marginTop: -1,
    }}
  >
    <Tree
      onSelect={selectSettings}
      selectedKeys={selectedKeys}
      defaultExpandedKeys={['1', '2', '3']}
    >
      <TreeNode title="Finance" key="1">
        <TreeNode title="Cost Unit" key="1-1" />
        <TreeNode title="Cost Unit Clinic" key="1-2" />
      </TreeNode>
      <TreeNode title="Students" key="3">
        <TreeNode title="Initiate" key="3-1" />
        <TreeNode title="Completed" key="3-2" />
        <TreeNode title="Pre Yudisium" key="3-3" />
        <TreeNode title="Assistance" key="3-4" />
      </TreeNode>
      <TreeNode title="Schedules" key="2">
        <TreeNode title="Pre test" key="2-1" />
      </TreeNode>
    </Tree>
  </div>
);

SettingsTree.propTypes = {
  selectSettings: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    selectedKeys: [state.reportReducers.reports.selectedMenuKey],
  }
);

const mapDispatchToProps = dispatch => (
  {
    selectSettings: (key) => {
      if (key && key[0]) {
        dispatch({
          type: 'SELECT_REPORT_MENU_KEY',
          payload: key[0],
        });
      }
    },
  }
);

const SettingsTreeWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsTree);

export default SettingsTreeWrapper;
