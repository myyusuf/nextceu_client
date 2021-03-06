import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tree from 'antd/lib/tree';

const TreeNode = Tree.TreeNode;

class SettingsTree extends Component {

  componentWillMount() {
    this.props.setPageTitle(this.props.selectedMenuTitle);
  }

  render() {
    const { selectSettings, selectedKeys } = this.props;
    return (
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
          defaultExpandedKeys={['1', '2']}
        >
          <TreeNode title="Application" key="1">
            <TreeNode title="Application Properties" key="1-0" />
            <TreeNode title="Department" key="1-1" />
            <TreeNode title="Upload Scores" key="1-2" />
            <TreeNode title="Problem Types" key="1-3" />
            <TreeNode title="Portofolio Types" key="1-4" />
            <TreeNode title="SGL Types" key="1-4b" />
            <TreeNode title="Kompre Types" key="1-5" />
            <TreeNode title="Seminar Types" key="1-5b" />
            <TreeNode title="Docents" key="1-6" />
            <TreeNode title="Pengampu" key="1-7" />
            <TreeNode title="Tutor" key="1-8" />
            <TreeNode title="Supervisor" key="1-9" />
          </TreeNode>
          <TreeNode title="Security" key="2">
            <TreeNode title="User" key="2-1" />
            <TreeNode title="Role" key="2-2" />
            <TreeNode title="Hospital User" key="2-3" />
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

SettingsTree.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  selectSettings: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    selectedKeys: [state.settingsReducers.settings.selectedMenuKey],
    selectedMenuTitle: [state.settingsReducers.settings.selectedMenuTitle],
  }
);

const mapDispatchToProps = dispatch => (
  {
    setPageTitle: (subTitle) => {
      dispatch({
        type: 'UPDATE_WORKSPACE_PAGE_TITLE',
        payload: { title: 'Settings', subTitle },
      });
    },
    selectSettings: (key, e) => {
      if (key && key[0]) {
        dispatch({
          type: 'UPDATE_WORKSPACE_PAGE_TITLE',
          payload: { title: 'Settings', subTitle: e.node.props.title },
        });

        dispatch({
          type: 'SELECT_MENU_KEY',
          payload: { key: key[0], title: e.node.props.title },
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
