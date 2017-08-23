import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';

class SeminarForm extends Component {
  render() {
    const columns = [{
      title: 'Code',
      dataIndex: 'code',
      key: 'name',
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }];
    const { seminars } = this.props.seminars;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={seminars} />
          </Col>
        </Row>
      </Form>
    );
  }
}

SeminarForm.propTypes = {
  seminars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => (
  {
    seminars: state.studentReducers.seminars,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);

const SeminarFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarForm);

export default SeminarFormWrapper;
