import { combineReducers } from 'redux-immutable';

import questions from './question-list-reducer';
import currentQuestion from './current-question-reducer';

const reducer = combineReducers(
  {
    questions,
    currentQuestion,
  },
);

export default reducer;
