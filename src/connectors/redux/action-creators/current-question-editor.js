export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const EDIT_TITLE = 'EDIT_TITLE';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const CHANGE_ANSWER = 'CHANGE_ANSWER';
export const HOVER_ON_QUESTION = 'HOVER_QUESTION';
export const CANCEL_HOVER = 'CANCEL_HOVER_QUESTION';


export function ChangeQuestion(qId) {
  const action = {
    type: CHANGE_QUESTION,
    id: qId,
  }
  return action;
}

export function HoverOver(qId) {
  const action = {
    type: HOVER_ON_QUESTION,
    id: qId,
  }
  return action;
}

export function CancelHoverOver() {
  const action = {
    type: CANCEL_HOVER,
  }
  return action;
}

