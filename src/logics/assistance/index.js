import assistanceLogics from './assistance';
import assistanceFormLogics from './assistance_form';

import participantLogics from './participant';

export default [
  ...assistanceLogics,
  ...assistanceFormLogics,
  ...participantLogics,
];
