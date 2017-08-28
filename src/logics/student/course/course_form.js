import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../../utils/validation';

import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/courses`;

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

const courseFormChangedLogic = createLogic({
  type: 'COURSE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_COURSE_FORM', payload: result });
    done();
  },
});

const loadCourseToFormLogic = createLogic({
  type: 'LOAD_COURSE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const course = action.payload;
    const courseForm = {
      id: {
        value: course.id,
      },
      title: {
        value: course.title,
      },
      completion: {
        value: course.completion,
      },
    };
    const validationResult = {};
    const keys = _.keys(courseForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = courseForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_COURSE_LOGIC', payload: { title: `${course.title} - ${course.Department.name}` } });
    dispatch({ type: 'LOAD_COURSE', payload: validationResult });

    // dispatch({ type: 'LOAD_SCHEDULE_TO_FORM', payload: course });
    done();
  },
});

export default [
  courseFormChangedLogic,
  loadCourseToFormLogic,
];
