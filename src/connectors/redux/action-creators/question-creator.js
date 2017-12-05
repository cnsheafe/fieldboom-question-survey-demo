import { List } from 'immutable';

const uuid = require('uuid/v4');

export const ADD_QUESTION = 'ADD_QUESTION';
export const MOVE_QUESTION = 'MOVE_QUESTION';
export const EDIT_TITLE = 'EDIT_QUESTION_TITLE';

export function AddQuestion(text, answers) {
  const action = {
    type: ADD_QUESTION,
    id: uuid(),
    title: text,
    answers: List(answers),
  };

  return action;
}

export function EditQuestion(text, qId, answers) {
  const action = {
    type: EDIT_TITLE,
    id: qId,
    title: text,
    answers: List(answers),
  };
  return action;
}

export function MoveQuestion(sourceId, index) {
  const action = {
    type: MOVE_QUESTION,
    id: sourceId,
    index: index,
  };

  return action;
}
