import { List } from 'immutable';

const uuid = require('uuid/v4');

export const ADD_QUESTION = 'ADD_QUESTION';
export const MOVE_QUESTION = 'MOVE_QUESTION';

export function AddQuestion(text, answers) {
  const action = {
    type: ADD_QUESTION,
    id: uuid(),
    title: text,
    answers: List(answers),
  };

  return action;
}
export function MoveQuestion(qId, newIndex) {
  const action = {
    type: MOVE_QUESTION,
    id: qId,
    index: newIndex,
  };

  return action;
}
