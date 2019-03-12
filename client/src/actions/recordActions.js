import axios from 'axios';

import {
  UPDATE_RECORDS,
  DATE_PICKER_CHANGE,
  SLIDER_CHANGE,
  STOP_RECORDS
} from './types';

export const datePickerChange = selectedDate => 
  ({ 
    type: DATE_PICKER_CHANGE, 
    payload: selectedDate
  })

export const sliderChange = selectedDate =>
  ({
    type: SLIDER_CHANGE,
    payload: selectedDate
  });

export const getRecords = selectedDate => dispatch => {

  axios.get('/api/records', {
    params: {
      date: selectedDate
    }
  })
  .then(res =>
    dispatch({
      type: UPDATE_RECORDS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: UPDATE_RECORDS,
      payload: null
    })
  );
};

export const updateRecords = function (res) {
  return {
    type: UPDATE_RECORDS,
    payload: res
  }
};

export const stopRecords = () => ({
  type: STOP_RECORDS
});
