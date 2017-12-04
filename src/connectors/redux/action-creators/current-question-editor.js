export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const EDIT_TITLE = 'EDIT_TITLE';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const CHANGE_ANSWER = 'CHANGE_ANSWER';


export function ChangeQuestion(qId) {
  const action = {
    type: CHANGE_QUESTION,
    id: qId,
  }
  return action;
}

