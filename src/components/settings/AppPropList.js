import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import AppPropWindow from './AppPropWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class AppPropList extends Component {
  componentWillMount() {
    this.props.fetchAppProps();
  }

  render() {
    const {
      appProps,
      fetchAppProps,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchAppProps()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => openAddWindow()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={appProps} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Code"
                dataIndex="code"
                key="code"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="String Value"
                dataIndex="stringValue"
                key="stringValue"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="edit"
                      onClick={() => openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => confirmDelete(record)}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <AppPropWindow />
      </div>
    );
  }
}

AppPropList.propTypes = {
  fetchAppProps: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  appProps: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

// AppPropList.defaultProps = {
//   searchText: '',
// };

const mapStateToProps = state => (
  {
    appProps: state.settingsReducers.appProps,
    searchText: state.settingsReducers.appPropSearch.searchText,
    loading: state.settingsReducers.appPropSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchAppProps: () => (
      dispatch({
        type: 'FETCH_APP_PROPS_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_APP_PROP_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_APP_PROP_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'APP_PROP_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete appProp: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_APP_PROP_LOGIC',
            payload: record,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const AppPropListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPropList);

export default AppPropListWrapper;
