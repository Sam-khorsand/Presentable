import {
  UPDATE_RECORDS,
  DATE_PICKER_CHANGE,
  SLIDER_CHANGE,
} from '../actions/types';
import hour from '../stringInterpolations/hour';

const initialState = {
  selectedDate: new Date(), 
  dataAvailable: false,
  chartData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
     // The payload needs to be coerced into a two-dementional array to be fed to google chart
    case UPDATE_RECORDS:
      return {
        ...state,
        dataAvailable: (action.payload.length === 0) ? false : true,
        chartData: action.payload.reduce(function (acc, curr) {
          var [date, ...args] = Object.values(curr);
          return [...acc, [hour`${new Date(date)}`, ...args]];
        }, [['date', 'sensor1', 'sensor2', 'sensor3', 'sensor4']])
      }

    case DATE_PICKER_CHANGE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }

    case SLIDER_CHANGE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }
    default:
      return state;
  }
}
