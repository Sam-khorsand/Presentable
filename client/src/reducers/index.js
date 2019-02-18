import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import recordReducer from './recordReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  records: recordReducer
});
