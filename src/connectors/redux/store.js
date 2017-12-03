import { createStore } from 'redux';
import { List, Map } from 'immutable';

import reducer from './reducers/master';

if (typeof window === 'undefined') {
  global.window = {};
}

const initState = Map({
  questions: List(),
});
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  initState, // initial state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
