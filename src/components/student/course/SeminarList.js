import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';

const Column = Table.Column;

class SeminarList extends Component {
  render() {
    const {
      seminars,
      fetchSeminars,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchSeminars()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={seminars} style={{ marginTop: 15 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Title"
                dataIndex="title"
                key="title"
              />
              <Column
                title="Date"
                dataIndex="eventDate"
                key="eventDate"
                render={(text, record) => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

SeminarList.propTypes = {
  fetchSeminars: PropTypes.func.isRequired,
  seminars: PropTypes.arrayOf(PropTypes.shape.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    seminars: state.studentReducers.courseSeminars.seminars,
    loading: state.studentReducers.courseSeminars.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSeminars: () => (
      dispatch({
        type: 'FETCH_COURSE_SEMINARS_LOGIC',
      })
    ),
  }
);

const SeminarListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarList);

export default SeminarListWrapper;
