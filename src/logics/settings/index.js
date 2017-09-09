import appPropLogics from './app_prop';
import appPropFormLogics from './app_prop_form';

import hospitalUserLogics from './hospital_user';
import hospitalUserFormLogics from './hospital_user_form';

export default [
  ...appPropLogics,
  ...appPropFormLogics,
  ...hospitalUserLogics,
  ...hospitalUserFormLogics,
];
