import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Modal from 'antd/lib/modal';
import Constant from '../../Constant';

const confirm = Modal.confirm;

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const CANCEL_FETCH_STUDENTS = 'CANCEL_FETCH_STUDENTS';
const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
const FETCH_STUDENTS_FAILED = 'FETCH_STUDENTS_FAILED';

const FETCH_STUDENT = 'FETCH_STUDENT';
const CANCEL_FETCH_STUDENT = 'CANCEL_FETCH_STUDENT';
const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
const FETCH_STUDENT_FAILED = 'FETCH_STUDENT_FAILED';

const fetchStudentsLogic = createLogic({
  type: FETCH_STUDENTS, // only apply this logic to this type
  cancelType: CANCEL_FETCH_STUDENTS, // cancel on this type
  latest: true,
  process({ getState, action }, dispatch, done) {
    const filter = getState().studentReducers.studentFilter;
    const paramameters = filter ? { params: { ...filter } } : {};
    axios.get(STUDENTS_URL, paramameters)
      .then(resp => resp.data)
      .then(students => dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: FETCH_STUDENTS_FAILED, payload: err, error: true });
      })
      .then(() => done());
  },
});

const fetchStudentLogic = createLogic({
  type: FETCH_STUDENT,
  cancelType: CANCEL_FETCH_STUDENT,
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${action.id}`)
      .then(resp => resp.data)
      .then(student => dispatch({ type: FETCH_STUDENT_SUCCESS, payload: student }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: FETCH_STUDENT_FAILED, payload: err, error: true });
      })
      .then(() => done());
  },
});

const deleteStudentLogic = createLogic({
  type: 'DELETE_STUDENT',
  process({ getState, action }, dispatch, done) {
    const deleteStudent = () => {
      axios.delete(`${STUDENTS_URL}/${action.student.id}`)
        .then(resp => resp.data)
        .then(() => {
          notification.success({
            message: 'Delete Student Success',
            description: 'Success deleting student',
          });
          dispatch({ type: 'FETCH_STUDENTS' });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: FETCH_STUDENT_FAILED, payload: err, error: true });
        })
        .then(() => done());
    };

    confirm({
      title: `Do you Want to delete student: ${action.student.name}`,
      content: 'This action cannot be undone',
      onOk() {
        deleteStudent();
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: 'OK',
      cancelText: 'Cancel',
    });
  },
});

const filterStudentsByLevelLogic = createLogic({
  type: 'FILTER_STUDENTS_BY_LEVEL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'FILTER_STUDENTS_BY_LEVEL', payload: action.payload });
    dispatch({ type: 'FETCH_STUDENTS' });
    done();
  },
});

const filterStudentsBySearchTextLogic = createLogic({
  type: 'FILTER_STUDENTS_BY_SEARCH_TEXT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'FILTER_STUDENTS_BY_SEARCH_TEXT', payload: action.payload });
    dispatch({ type: 'FETCH_STUDENTS' });
    done();
  },
});

export default [
  fetchStudentsLogic,
  fetchStudentLogic,
  deleteStudentLogic,
  filterStudentsByLevelLogic,
  filterStudentsBySearchTextLogic,
];
