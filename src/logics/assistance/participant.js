import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';

const ASSISTANCES_URL = `${Constant.serverUrl}/api/assistances`;

const fetchParticipantsLogic = createLogic({
  type: 'FETCH_ASSISTANCE_PARTICIPANTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ASSISTANCE_PARTICIPANTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const assistanceId = getState().assistanceReducers.assistanceSelection.rowKeys[0];
    const search = getState().assistanceReducers.participantSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'ASSISTANCE_PARTICIPANT_LOADING_START' });
    axios.get(`${ASSISTANCES_URL}/${assistanceId}/participants`, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'ASSISTANCE_PARTICIPANT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_ASSISTANCE_PARTICIPANTS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'ASSISTANCE_PARTICIPANT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch participants error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchParticipantsLogic,
];
