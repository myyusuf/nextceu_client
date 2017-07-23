import React from 'react';
import { Modal, Button, Panel, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';
import Constant from '../../Constant';

const HOSPITAL_SELECT_URL = `${Constant.serverUrl}/api/hospitalselect`;

class HospitalSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hospitals: [],
      selectedHospital: null,
      showModal: props.showModal,
    };

    this.close = this.close.bind(this);
    this.selectHospital = this.selectHospital.bind(this);
    this.panelClick = this.panelClick.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      selectedHospital: null,
    }, () => {
      this.loadData();
    });
  }

  loadData() {
    axios.get(HOSPITAL_SELECT_URL, { params: { hospitalType: 1 } })
    .then((response) => {
      this.setState({
        hospitals: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  panelClick(selectedHospital) {
    const hospitals = this.state.hospitals;
    for (let i = 0; i < hospitals.length; i += 1) {
      const hospital = hospitals[i];
      if (selectedHospital.id === hospital.id) {
        hospital.selected = true;
      } else {
        hospital.selected = false;
      }
    }
    this.setState({
      hospitals,
      selectedHospital,
    });
  }

  selectHospital() {
    this.props.onHospitalSelected(this.state.selectedHospital);
  }

  close() {
    this.setState({
      showModal: false,
      hospitals: [],
      selectedHospital: null,
    });
  }

  render() {
    const hospitalListItems = [];
    for (let i = 0; i < this.state.hospitals.length; i += 1) {
      const hospital = this.state.hospitals[i];

      let backgroundColor = '#fff';
      if (hospital.selected) {
        backgroundColor = '#dff0d8';
      }

      hospitalListItems.push(
        <Panel
          key={hospital.id}
          style={{ marginBottom: 10, backgroundColor }}
          onClick={() => this.panelClick(hospital)}
        >
          <Row>
            <Col md={6}>
              { hospital.name }
            </Col>
            <Col md={2}>
              <span className="badge bg-info">{ hospital.departmentQuota }</span>
            </Col>
            <Col md={2}>
              <span className="badge bg-success">{ hospital.studentsInDepartmentCount }</span>
            </Col>
            <Col md={2}>
              <span className="badge bg-default">{ hospital.studentsInDepartmentCount }</span>
            </Col>
          </Row>
        </Panel>
      );
    }

    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
      >
        <Modal.Header>
          <Modal.Title>Pilih Rumah Sakit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {hospitalListItems}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.selectHospital}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

HospitalSelect.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default HospitalSelect;
