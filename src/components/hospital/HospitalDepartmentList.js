import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import HospitalDepartmentWindow from './HospitalDepartmentWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

const HospitalDepartmentList = ({
  hospitalDepartments,
  openAddWindow,
  openEditWindow,
  confirmDelete,
  loading,
}) => (
  <div style={{ paddingLeft: 15, paddingRight: 15 }}>
    <Row>
      <Col span={4} offset={20}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          style={{ marginTop: 0 }}
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table dataSource={hospitalDepartments} style={{ marginTop: 20 }} rowKey="id" loading={loading}>
          <Column
            title="Name"
            dataIndex="name"
            key="name"
          />
          <Column
            title="Quota"
            dataIndex="quota"
            key="quota"
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
    <HospitalDepartmentWindow />
  </div>
);

HospitalDepartmentList.propTypes = {
  hospitalDepartments: PropTypes.arrayOf(PropTypes.shape({
    Department: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    quota: PropTypes.number.isRequired,
  })).isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    hospitalDepartments: state.hospitalReducers.hospitalDepartments,
    loading: state.hospitalReducers.hospitalDepartmentSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => {
      dispatch({
        type: 'EDIT_HOSPITAL_DEPARTMENT_LOGIC',
      });
    },
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_HOSPITAL_DEPARTMENT_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete department : ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_HOSPITAL_DEPARTMENT_LOGIC',
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

const HospitalDepartmentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalDepartmentList);

export default HospitalDepartmentListWrapper;
