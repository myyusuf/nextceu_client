import { connect } from 'react-redux';
import HospitalForm from '../../components/hospital/HospitalForm';

const mapStateToProps = state => (
  {
    hospitalForm: state.hospitalReducers.hospitalForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    hospitalFormChanged: (payload) => {
      dispatch({
        type: 'HOSPITAL_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const HospitalFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalForm);

export default HospitalFormWrapper;
