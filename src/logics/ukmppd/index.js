import ukmppdLogics from './ukmppd';

import uptLogics from './upt/upt';
import uptFormLogics from './upt/upt_form';

import kompreLogics from './kompre';
import kompreFormLogics from './kompre_form';

export default [
  ...ukmppdLogics,
  ...uptLogics,
  ...uptFormLogics,
  ...kompreLogics,
  ...kompreFormLogics,
];
