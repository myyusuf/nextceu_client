import { connect } from 'react-redux';
import HospitalForm from '../../components/hospital/HospitalForm';

const mapStateToProps = state => (
  {
    hospitalForm: state.hospitalReducers.hospitalModalForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    hospitalFormChanged: (payload) => {
      dispatch({
        type: 'HOSPITAL_MODAL_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const HospitalModalFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalForm);

export default HospitalModalFormWrapper;
