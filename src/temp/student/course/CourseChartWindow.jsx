import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Gantt from '../../chart/Gantt';
import Constant from '../../Constant';

class CourseChartWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      showModal: this.props.showModal,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      chartData: nextProps.chartData,
    });
  }

  close() {
    this.setState({
      showModal: false,
      chartData: [],
    }, () => {
      this.props.onClose();
    });
  }

  render() {

    const data = {
      data: this.state.chartData,
    };

    return (
      <Modal
        dialogClassName="chart-modal"
        show={this.state.showModal}
        onHide={this.close}
      >
        <Modal.Header>
          <Modal.Title>Schedule Chart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{ height: 500 }}>
            <Gantt tasks={data} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

CourseChartWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default CourseChartWindow;
