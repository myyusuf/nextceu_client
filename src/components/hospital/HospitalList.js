import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Spin from 'antd/lib/spin';
import Modal from 'antd/lib/modal';

import HospitalListItem from './HospitalListItem';
import HospitalWindow from './HospitalWindow';

const confirm = Modal.confirm;

class HospitalList extends Component {

  componentWillMount() {
    this.props.fetchHospitals();
  }

  render() {
    const { hospitals, hospitalTypeChanged, loading } = this.props;
    return (
      <div style={{ padding: 15, backgroundColor: '#eDeff5' }}>
        <Row>
          <Col span={24}>
            <Menu
              mode="horizontal"
              onClick={(e) => {
                hospitalTypeChanged(e.key);
              }}
              style={{ backgroundColor: '#eDeff5' }}
            >
              <Menu.Item key="1">
                Hospitals
              </Menu.Item>
              <Menu.Item key="2">
                Clinics
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Row gutter={20}>
          {hospitals.map(hospital => (
            <Col span={8}>
              <HospitalListItem name={hospital.name} />
            </Col>
          ))}
          <div style={{ width: 20, marginLeft: 'auto', marginRight: 'auto' }}>
            <Spin spinning={loading} />
          </div>
        </Row>
        <HospitalWindow />
      </div>
    );
  }
}

HospitalList.propTypes = {
  fetchHospitals: PropTypes.func.isRequired,
  hospitalTypeChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hospitals: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    hospitals: state.hospitalReducers.hospitals,
    searchText: state.hospitalReducers.hospitalSearch.searchText,
    loading: state.hospitalReducers.hospitalSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchHospitals: () => (
      dispatch({
        type: 'FETCH_HOSPITALS_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_HOSPITAL_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_HOSPITAL_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    hospitalTypeChanged: value => (
      dispatch({
        type: 'HOSPITAL_SEARCH_TYPE_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete hospital: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_HOSPITAL_LOGIC',
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

const HospitalListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalList);

export default HospitalListWrapper;
