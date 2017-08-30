import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist } from '../../utils/validation';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;
const HOSPITAL_DEPARTMENTS_URL = `${Constant.serverUrl}/api/hospitaldepartments`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'quota':
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchHospitalDepartmentsLogic = createLogic({
  type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITAL_DEPARTMENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().hospitalReducers.hospitalDepartmentSearch;
    const paramameters = search ? { params: { ...search } } : {};
    const hospitalId = getState().hospitalReducers.hospitalForm.id.value;
    dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_START' });
    axios.get(`${HOSPITALS_URL}/${hospitalId}/departments`, paramameters)
      .then(resp => resp.data)
      .then((hospitalDepartments) => {
        dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_SUCCESS', payload: hospitalDepartments });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch hospitalDepartments error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editHospitalDepartmentLogic = createLogic({
  type: 'EDIT_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_DEPARTMENT_FORM' });
    dispatch({ type: 'SHOW_HOSPITAL_DEPARTMENT_WINDOW' });
    done();
  },
});

const cancelEditHospitalDepartmentLogic = createLogic({
  type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW' });
    done();
  },
});

const saveHospitalDepartmentLogic = createLogic({
  type: 'SAVE_HOSPITAL_DEPARTMENT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const hospitalDepartmentForm = { ...getState().hospitalReducers.hospitalDepartmentForm };
    const validationResult = {};
    const keys = _.keys(hospitalDepartmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = hospitalDepartmentForm[key].value;
        validationResult[key] = {
          value,
          ...validate(key, value),
        };

        if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
          isFormValid = false;
        }
      }
    }

    if (isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_HOSPITAL_DEPARTMENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const hospitalDepartmentForm = _.mapValues({ ...getState().hospitalReducers.hospitalDepartmentForm }, 'value');
    hospitalDepartmentForm.hospital = getState().hospitalReducers.hospitalForm.id.value;
    dispatch({ type: 'SHOW_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });

    if (hospitalDepartmentForm.id) {
      axios.put(`${HOSPITAL_DEPARTMENTS_URL}/${hospitalDepartmentForm.id}`, hospitalDepartmentForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Update hospitalDepartment success',
            description: 'Success saving hospitalDepartment',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. HospitalDepartment code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update hospitalDepartment error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(HOSPITAL_DEPARTMENTS_URL, hospitalDepartmentForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Create department success',
            description: 'Success saving department',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. department code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create department error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteHospitalDepartmentLogic = createLogic({
  type: 'DELETE_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${HOSPITAL_DEPARTMENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete department success',
          description: 'Success deleting department',
        });
        dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete department error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchHospitalDepartmentsLogic,
  editHospitalDepartmentLogic,
  cancelEditHospitalDepartmentLogic,
  saveHospitalDepartmentLogic,
  deleteHospitalDepartmentLogic,
];
