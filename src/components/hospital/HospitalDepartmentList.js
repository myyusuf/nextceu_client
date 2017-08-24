import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import HospitalDepartmentListItem from './HospitalDepartmentListItem';

const HospitalDepartmentList = ({ hospitalDepartments }) => (
  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
    <Row>
      <Col span={4} offset={20}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          style={{ marginTop: 20 }}
          onClick={() => this.props.openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        {hospitalDepartments.map(hospitalDepartment => (
          <HospitalDepartmentListItem hospitalDepartment={hospitalDepartment} />
        ))}
      </Col>
    </Row>
  </div>
);

HospitalDepartmentList.propTypes = {
  hospitalDepartments: PropTypes.arrayOf(PropTypes.shape({
    Department: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    quota: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    hospitalDepartments: state.hospitalReducers.hospitalDepartments,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => {
      dispatch({
        type: 'OPEN_HOSPITAL_DEPARTMENT_ADD_WINDOW',
      });
    },
  }
);

const HospitalDepartmentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalDepartmentList);

export default HospitalDepartmentListWrapper;
