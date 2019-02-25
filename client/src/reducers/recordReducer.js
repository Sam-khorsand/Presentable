import {
  GET_RECORDS,
  CHANGE_DATE,
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
    case GET_RECORDS:
      return {
        ...state,
        dataAvailable: (action.payload.length === 0) ? false : true,
        chartData: action.payload.reduce(function (acc, curr) {
          var [date, ...args] = Object.values(curr);
          return [...acc, [hour`${new Date(date)}`, ...args]];
        }, [['date', 'sensor1', 'sensor2', 'sensor3', 'sensor4']])
      }

    case CHANGE_DATE: {
      return {
        ...state,
        selectedDate: action.selectedDate
      }
    }
    default:
      return state;
  }
}
