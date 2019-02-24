import {
  GET_RECORDS,
  CHANGE_DATE,
} from '../actions/types';

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
        chartData: action.payload.reduce(
          (arr, recs) =>
            [...arr, ...[Object.keys(recs).map((i) =>
              (i === 'date') ? '' + new Date(recs[i]).getHours() : recs[i]
            )]]
          , [['date', 'sensor1', 'sensor2', 'sensor3', 'sensor4']])
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
