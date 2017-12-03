import { ADD_QUESTION, MOVE_QUESTION } from '../action-creators/QuestionAC';

const uuid = require('uuid/v4');

function addQuestionToState(state, action) {
  const question = {
    title: action.title,
    answers: action.answers,
    id: uuid(),
  };
  const questionList = state.push(question);

  return questionList;
}

function moveQuestion(state, action) {
  const keyValuePair = state.questions.findEntry(val => {
    return val.id === action.id;
  });

  return state.questions
    .delete(keyValuePair[0])
    .insert(keyValuePair[1], keyValuePair[0]);
}

export default function(state, action = {}) {
  switch (action.type) {
    case ADD_QUESTION:
      return addQuestionToState(state, action);
    case MOVE_QUESTION:
      return {
        questions: moveQuestion(state, action),
      };
    default:
      return state;
  }
}
