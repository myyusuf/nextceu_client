import hospitalLogics from './hospital';
import hospitalFormLogics from './hospital_form';

import hospitalDepartmentLogics from './hospital_department';
import hospitalDepartmentFormLogics from './hospital_department_form';

export default [
  ...hospitalLogics,
  ...hospitalFormLogics,
  ...hospitalDepartmentLogics,
  ...hospitalDepartmentFormLogics,
];
