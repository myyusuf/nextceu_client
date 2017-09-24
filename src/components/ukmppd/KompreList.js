import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';

import KompreWindow from './KompreWindow';
import ScoreList from './ScoreList';

const TabPane = Tabs.TabPane;

class KompreList extends Component {
  componentWillMount() {
    // this.props.fetchKompres();
  }

  render() {
    const {
      openAddWindow,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={16}>
            <span>
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
            <Tabs type="card" defaultActiveKey="1" style={{ marginTop: 10, height: 500 }}>
              <TabPane tab="Pre kompre" key="1">
                <ScoreList kompreType="K001" />
              </TabPane>
              <TabPane tab="Mid Kompre" key="2">
                <ScoreList kompreType="K002" />
              </TabPane>
              <TabPane tab="Final Kompre" key="3">
                <ScoreList kompreType="K003" />
              </TabPane>
              <TabPane tab="Try Out" key="4">
                <ScoreList kompreType="K004" />
              </TabPane>
            </Tabs>
          </Col>
        </Row>

        <KompreWindow />
      </div>
    );
  }
}

KompreList.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    kompres: state.ukmppdReducers.kompres,
    loading: state.ukmppdReducers.kompreSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchKompres: () => (
      dispatch({
        type: 'FETCH_KOMPRES_LOGIC',
      })
    ),
    openAddWindow: () => {
      dispatch({
        type: 'FETCH_UPTS_LOGIC',
      });

      dispatch({
        type: 'EDIT_KOMPRE_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'KOMPRE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
  }
);

const KompreListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KompreList);

export default KompreListWrapper;
