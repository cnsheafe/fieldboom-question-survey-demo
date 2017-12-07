import {
  CHANGE_QUESTION,
  HOVER_ON_QUESTION,
  CANCEL_HOVER,
} from '../action-creators/current-question';

function changeQuestion(state, action) {
  return state.set('id', action.id);
}

function hoverOver(state, action) {
  return state.set('next', action.id);
}

function cancelHoverOver(state, action) {
  return state.set('next', '');
}

export default function(state, action = {}) {
  switch (action.type) {
    case CHANGE_QUESTION:
      return changeQuestion(state, action);
    case HOVER_ON_QUESTION:
      return hoverOver(state, action);
    case CANCEL_HOVER:
      return cancelHoverOver(state, action);
    default:
      return state;
  }
}
