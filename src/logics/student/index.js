import studentLogics from './student';
import studentFormLogics from './student_form';
import courseLogics from './course/course';
import courseFormLogics from './course/course_form';
// import scoreFormLogics from './course/score_form';

import addCourseByLevelFormLogics from './course/add_course_by_level_form';
import addCourseByLevelLogics from './course/add_course_by_level';

import addCourseByDepartmentFormLogics from './course/add_course_by_department_form';
import addCourseByDepartmentLogics from './course/add_course_by_department';

import hospitalScheduleLogics from './course/hospital_schedule';

import scoreLogics from './course/score/score';
import scoreFormLogics from './course/score/score_form';

import cptLogics from './course/cpt/cpt';
import cptFormLogics from './course/cpt/cpt_form';

import courseProblemLogics from './course/course_problem/course_problem';
import courseProblemFormLogics from './course/course_problem/course_problem_form';

import pftLogics from './course/pft/pft';
import pftFormLogics from './course/pft/pft_form';

import portofolioLogics from './course/portofolio/portofolio';
import portofolioFormLogics from './course/portofolio/portofolio_form';

import courseSeminarLogics from './course/course_seminar';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...courseLogics,
  ...courseFormLogics,
  // ...scoreFormLogics,
  ...addCourseByLevelFormLogics,
  ...addCourseByLevelLogics,
  ...addCourseByDepartmentFormLogics,
  ...addCourseByDepartmentLogics,
  ...hospitalScheduleLogics,
  ...scoreLogics,
  ...scoreFormLogics,
  ...cptLogics,
  ...cptFormLogics,
  ...courseProblemLogics,
  ...courseProblemFormLogics,
  ...pftLogics,
  ...pftFormLogics,
  ...portofolioLogics,
  ...portofolioFormLogics,
  ...courseSeminarLogics,
];
