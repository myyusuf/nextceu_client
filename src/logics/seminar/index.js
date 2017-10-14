import seminarLogics from './seminar';
import seminarFormLogics from './seminar_form';
import smtLogics from './smt/smt';
import smtFormLogics from './smt/smt_form';

import participantLogics from './participant';

export default [
  ...seminarLogics,
  ...seminarFormLogics,
  ...smtLogics,
  ...smtFormLogics,
  ...participantLogics,
];
