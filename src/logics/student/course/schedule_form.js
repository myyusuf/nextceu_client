import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../../utils/validation';

import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/schedules`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }

  return result;
};

const scheduleFormChangedLogic = createLogic({
  type: 'SCHEDULE_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SCHEDULE_FORM', payload: result });
    done();
  },
});

const saveScheduleFormLogic = createLogic({
  type: 'SAVE_SCHEDULE_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const scheduleForm = { ...getState().scheduleReducers.scheduleForm };
    const validationResult = {};
    const keys = _.keys(scheduleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = scheduleForm[key].value;
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
      reject({ type: 'SHOW_SCHEDULE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const scheduleForm = _.mapValues({ ...getState().scheduleReducers.scheduleForm }, 'value');
    scheduleForm.level = 1;

    dispatch({ type: 'SHOW_SCHEDULE_WINDOW_CONFIRM_LOADING' });

    if (scheduleForm.id) {
      axios.put(`${STUDENTS_URL}/${scheduleForm.id}`, scheduleForm)
        .then((schedules) => {
          dispatch({ type: 'SAVE_SCHEDULE_FORM_SUCCESS', payload: schedules });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'SAVE_SCHEDULE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(STUDENTS_URL, scheduleForm)
        .then((schedules) => {
          dispatch({ type: 'SAVE_SCHEDULE_FORM_SUCCESS', payload: schedules });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'SAVE_SCHEDULE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveScheduleFormSuccessLogic = createLogic({
  type: 'SAVE_SCHEDULE_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'FETCH_SCHEDULES' });
    notification.success({
      message: 'Save Schedule Success',
      description: 'Success saving schedule',
    });
    done();
  },
});

const saveScheduleFormFailedLogic = createLogic({
  type: 'SAVE_SCHEDULE_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_SCHEDULE_WINDOW' });
    notification.error({
      message: 'Add Schedule Error',
      description: 'Error creating new schedule',
    });
    done();
  },
});

const loadScheduleFormLogic = createLogic({
  type: 'LOAD_SCHEDULE_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const schedule = action.payload;
    schedule.planDate = [moment(schedule.planStartDate), moment(schedule.planEndDate)];
    const scheduleForm = {
      id: {
        value: schedule.id,
      },
      planDate: {
        value: schedule.planDate,
      },
      realStartDate: {
        value: schedule.realStartDate,
      },
      realEndDate: {
        value: schedule.realEndDate,
      },
    };
    const validationResult = {};
    const keys = _.keys(scheduleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = scheduleForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'OPEN_SCHEDULE_WINDOW', payload: { title: `${schedule.title} - ${schedule.Department.name}` } });
    dispatch({ type: 'LOAD_SCHEDULE', payload: validationResult });
    done();
  },
});

export default [
  scheduleFormChangedLogic,
  saveScheduleFormLogic,
  saveScheduleFormSuccessLogic,
  saveScheduleFormFailedLogic,
  loadScheduleFormLogic,
];
