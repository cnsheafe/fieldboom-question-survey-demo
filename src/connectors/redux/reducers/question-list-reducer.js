import {
  ADD_QUESTION,
  MOVE_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION,
} from '../action-creators/question-list';

function addQuestionToState(state, action) {
  const question = {
    title: action.title,
    answers: action.answers,
    id: action.id,
  };
  const questionList = state.push(question);

  return questionList;
}

function deleteQuestion(state, action) {
  const index = state.findIndex(question => {
    return question.id === action.id
  });
  return state.delete(index);
}

function updateQuestion(state, action) {
  const [index, question] = state.findEntry(q => {
    return q.id === action.id;
  });
  const updatedQuestion = {
    title: action.title,
    answers: action.answers,
    id: question.id,
  };
  const newState = state.set(index, updatedQuestion);
  return newState;
}

function moveQuestion(state, action) {
  const [index, question] = state.findEntry(val => {
    return val.id === action.id;
  });

  return state
    .delete(index)
    .insert(action.index, question);
}

/**
 * Handles the questions-list branch of the app state
 * @param {List} state A list of questions
 * @param {*} action Action
 */
export default function(state, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return addQuestionToState(state, action);
    case DELETE_QUESTION:
      return deleteQuestion(state, action);
    case EDIT_QUESTION:
      return updateQuestion(state, action);
    case MOVE_QUESTION:
      return moveQuestion(state, action);
    default:
      return state;
  }
}
