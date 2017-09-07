import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateExist, validateLength } from '../../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    case 'description':
      result = validateLength(key, value, 10);
      break;
    case 'courseProblemType':
    case 'problemDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const courseProblemFormChangedLogic = createLogic({
  type: 'COURSE_PROBLEM_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_COURSE_PROBLEM_FORM', payload: result });
    done();
  },
});

const loadUserFormLogic = createLogic({
  type: 'LOAD_COURSE_PROBLEM_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const courseProblem = action.payload;
    const courseProblemTypeId = courseProblem.CourseProblemType ?
    courseProblem.CourseProblemType.id : undefined;
    if (courseProblem.problemDate) {
      courseProblem.problemDate = moment(courseProblem.problemDate);
    }
    const courseProblemForm = {
      id: {
        value: courseProblem.id,
      },
      title: {
        value: courseProblem.title,
      },
      description: {
        value: courseProblem.description,
      },
      courseProblemType: {
        value: String(courseProblemTypeId),
      },
      problemDate: {
        value: courseProblem.problemDate,
      },
      comment: {
        value: courseProblem.comment,
      },
      completed: {
        value: courseProblem.completed,
      },
    };
    const validationResult = {};
    const keys = _.keys(courseProblemForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = courseProblemForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_COURSE_PROBLEM_LOGIC' });
    dispatch({ type: 'LOAD_COURSE_PROBLEM', payload: validationResult });
    done();
  },
});

export default [
  courseProblemFormChangedLogic,
  loadUserFormLogic,
];
