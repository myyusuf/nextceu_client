import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const SEMINARS_URL = `${Constant.serverUrl}/api/seminars`;

const fetchParticipantsLogic = createLogic({
  type: 'FETCH_PARTICIPANTS_LOGIC',
  cancelType: 'CANCEL_FETCH_PARTICIPANTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const seminarId = getState().seminarReducers.seminarSelection.rowKeys[0];
    const search = getState().seminarReducers.participantSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PARTICIPANT_LOADING_START' });
    axios.get(`${SEMINARS_URL}/${seminarId}/participants`, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PARTICIPANT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PARTICIPANTS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PARTICIPANT_LOADING_FINISH' });
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
