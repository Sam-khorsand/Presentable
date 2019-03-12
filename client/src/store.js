import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import { recordsEpic } from './epics/recordsEpic';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  selectedDate: new Date(),
  dataAvailable: false,
};

const middleware = [thunk, epicMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

epicMiddleware.run(recordsEpic);

export default store;
