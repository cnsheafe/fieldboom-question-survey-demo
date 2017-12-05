import {
  CHANGE_QUESTION,
} from '../action-creators/current-question-editor';

function changeQuestion(state, action) {
  return state.set('id', action.id);
}


export default function(state, action = {}) {
  switch (action.type) {
    case CHANGE_QUESTION:
      return changeQuestion(state, action);
    default:
      return state;
  }
}
