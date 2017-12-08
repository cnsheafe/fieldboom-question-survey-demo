import { List } from 'immutable';

const uuid = require('uuid/v4');

export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const MOVE_QUESTION = 'MOVE_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';

/**
 * Adds question to the list
 * @param {string} text The question
 * @param {List<string>} answers List of possible answers
 */
export function AddQuestion(text, answers) {
  const action = {
    type: ADD_QUESTION,
    id: uuid(),
    title: text,
    answers: List(answers),
  };

  return action;
}

/**
 * Deletes question from the list
 * @param {string} qId Question Id
 */
export function DeleteQuestion(qId) {
  const action = {
    type: DELETE_QUESTION,
    id: qId,
  };

  return action;
}

/**
 * Edit a question on the list
 * @param {string} text New text
 * @param {string} qId Id of the question
 * @param {List<string>} answers New answers
 */
export function EditQuestion(text, qId, answers) {
  const action = {
    type: EDIT_QUESTION,
    id: qId,
    title: text,
    answers: List(answers),
  };

  return action;
}

/**
 * Moves a question on the list to a new index
 * @param {string} sourceId Id of the question to move
 * @param {*} index Index to move the question to
 */
export function MoveQuestion(sourceId, index) {
  const action = {
    type: MOVE_QUESTION,
    id: sourceId,
    index: index,
  };

  return action;
}
