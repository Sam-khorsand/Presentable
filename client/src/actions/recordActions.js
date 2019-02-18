import axios from 'axios';

import {
  GET_RECORDS,
  CHANGE_DATE
} from './types';

export const changeDate = selectedDate => ({ type: CHANGE_DATE, selectedDate })

export const getRecords = selectedDate => dispatch => {

  axios.get('/api/records', {
    params: {
      date: selectedDate
    }
  })
  .then(res =>
    dispatch({
      type: GET_RECORDS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_RECORDS,
      payload: null
    })
  );
};
