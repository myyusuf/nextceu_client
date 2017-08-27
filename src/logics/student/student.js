import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import Constant from '../../Constant';
import { validateLength, validateEmail, validateExist } from '../../utils/validation';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'oldSid':
    case 'newSid':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'email':
      result = validateEmail(key, value);
      break;
    case 'gender':
      result = validateExist(key, value);
      break;
    case 'level':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchStudentsLogic = createLogic({
  type: 'FETCH_STUDENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_STUDENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().studentReducers.studentSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'STUDENT_LOADING_START' });
    axios.get(STUDENTS_URL, paramameters)
      .then(resp => resp.data)
      .then((students) => {
        dispatch({ type: 'STUDENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: students });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'STUDENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch students error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchStudentLogic = createLogic({
  type: 'FETCH_STUDENT_LOGIC',
  cancelType: 'CANCEL_FETCH_STUDENT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(student => dispatch({ type: 'FETCH_STUDENT_SUCCESS', payload: student }))
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch student error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editStudentLogic = createLogic({
  type: 'EDIT_STUDENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_STUDENT_FORM' });
    dispatch({ type: 'SHOW_STUDENT_WINDOW' });
    done();
  },
});

const cancelEditStudentLogic = createLogic({
  type: 'CANCEL_EDIT_STUDENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_STUDENT_FORM' });
    dispatch({ type: 'HIDE_STUDENT_WINDOW' });
    done();
  },
});

const saveStudentLogic = createLogic({
  type: 'SAVE_STUDENT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const studentForm = { ...getState().studentReducers.studentForm };
    const validationResult = {};
    const keys = _.keys(studentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = studentForm[key].value;
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
      reject({ type: 'SHOW_STUDENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const studentForm = _.mapValues({ ...getState().studentReducers.studentForm }, 'value');
    dispatch({ type: 'SHOW_STUDENT_WINDOW_CONFIRM_LOADING' });

    if (studentForm.id) {
      axios.put(`${STUDENTS_URL}/${studentForm.id}`, studentForm)
        .then(() => {
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_STUDENT_LOGIC' });
          dispatch({ type: 'FETCH_STUDENTS_LOGIC' });
          notification.success({
            message: 'Update student success',
            description: 'Success saving student',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. old and new SID must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update student error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(STUDENTS_URL, studentForm)
        .then(() => {
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_STUDENT_LOGIC' });
          dispatch({ type: 'FETCH_STUDENTS_LOGIC' });
          notification.success({
            message: 'Create student success',
            description: 'Success saving student',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. old and new SID must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create student error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteStudentLogic = createLogic({
  type: 'DELETE_STUDENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${STUDENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete Student Success',
          description: 'Success deleting student',
        });
        dispatch({ type: 'FETCH_STUDENTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Ex. Student is referred by another object';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        notification.error({
          message: 'Delete student error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

const selectStudentLogic = createLogic({
  type: 'SELECT_STUDENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SELECT_STUDENT', payload: action.payload });
    dispatch({ type: 'FETCH_STUDENT_LOGIC', payload: action.payload });
    done();
  },
});

const filterStudentsByLevelLogic = createLogic({
  type: 'STUDENT_LEVEL_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'STUDENT_LEVEL_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_STUDENTS_LOGIC' });
    done();
  },
});

export default [
  fetchStudentsLogic,
  fetchStudentLogic,
  editStudentLogic,
  cancelEditStudentLogic,
  saveStudentLogic,
  deleteStudentLogic,
  selectStudentLogic,
  filterStudentsByLevelLogic,
];
