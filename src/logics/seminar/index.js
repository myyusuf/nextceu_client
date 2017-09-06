import seminarLogics from './seminar';
import seminarFormLogics from './seminar_form';

import participantLogics from './participant';

export default [
  ...seminarLogics,
  ...seminarFormLogics,
  ...participantLogics,
];
