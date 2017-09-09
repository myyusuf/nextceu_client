import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateLength, validateArrayNotEmpty } from '../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    case 'planDate':
      result = validateArrayNotEmpty(key, value);
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

    course.planDate = [moment(course.planStartDate), moment(course.planEndDate)];
    course.planDate1 = course.planStartDate1 && course.planEndDate1 ? [moment(course.planStartDate1), moment(course.planEndDate1)] : [];
    course.planDate2 = course.planStartDate2 && course.planEndDate2 ? [moment(course.planStartDate2), moment(course.planEndDate2)] : [];
    course.planDate3 = course.planStartDate3 && course.planEndDate3 ? [moment(course.planStartDate3), moment(course.planEndDate3)] : [];

    if (course.realStartDate) course.realStartDate = moment(course.realStartDate);
    if (course.realEndDate) course.realEndDate = moment(course.realEndDate);

    if (course.realStartDate1) course.realStartDate1 = moment(course.realStartDate1);
    if (course.realEndDate1) course.realEndDate1 = moment(course.realEndDate1);

    if (course.realStartDate2) course.realStartDate2 = moment(course.realStartDate2);
    if (course.realEndDate2) course.realEndDate2 = moment(course.realEndDate2);

    if (course.realStartDate3) course.realStartDate3 = moment(course.realStartDate3);
    if (course.realEndDate3) course.realEndDate3 = moment(course.realEndDate3);

    const adviserId = course.adviser ? String(course.adviser.id) : course.adviser;
    const examinerId = course.examiner ? String(course.examiner.id) : course.examiner;

    const courseForm = {
      id: {
        value: course.id,
      },
      title: {
        value: course.title,
      },
      adviser: {
        value: adviserId,
      },
      examiner: {
        value: examinerId,
      },
      // completion: {
      //   value: course.completion,
      // },
      status: {
        value: course.status,
      },

      planDate: {
        value: course.planDate,
      },
      realStartDate: {
        value: course.realStartDate,
      },
      realEndDate: {
        value: course.realEndDate,
      },
      planDate1: {
        value: course.planDate1,
      },
      realStartDate1: {
        value: course.realStartDate1,
      },
      realEndDate1: {
        value: course.realEndDate1,
      },
      planDate2: {
        value: course.planDate2,
      },
      realStartDate2: {
        value: course.realStartDate2,
      },
      realEndDate2: {
        value: course.realEndDate2,
      },
      planDate3: {
        value: course.planDate3,
      },
      realStartDate3: {
        value: course.realStartDate3,
      },
      realEndDate3: {
        value: course.realEndDate3,
      },
      hospital1: {
        value: course.hospital1,
      },
      clinic: {
        value: course.clinic,
      },
      tempProblemDescription: {
        value: course.problemDescription,
      },
      tempDepartment: {
        value: course.Department.id,
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

    dispatch({ type: 'HOSPITAL_SCHEDULE_DEPARTMENT_CHANGED', payload: course.Department.id });

    dispatch({ type: 'LOAD_SCORE_TO_FORM_LOGIC', payload: course.Score });
    done();
  },
});

export default [
  courseFormChangedLogic,
  loadCourseToFormLogic,
];
