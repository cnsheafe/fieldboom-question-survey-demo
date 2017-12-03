import { combineReducers } from 'redux-immutable';

import questions from './questions';

const reducer = combineReducers({
  questions,
});

export default reducer;
