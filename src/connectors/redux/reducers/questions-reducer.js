import { ADD_QUESTION, MOVE_QUESTION, EDIT_TITLE } from '../action-creators/question-creator';

function addQuestionToState(state, action) {
  const question = {
    title: action.title,
    answers: action.answers,
    id: action.id,
  };
  const questionList = state.push(question);

  return questionList;
}

function updateTitle(state, action) {
  const keyValuePair = state.findEntry(q => {
    return q.id === action.id;
  });
  const updatedQuestion = {
    title: action.title,
    answers: action.answers,
    id: keyValuePair[1].id,
  }
  const newState = state.set(keyValuePair[0], updatedQuestion);
  return newState;
}


function moveQuestion(state, action) {
  const keyValuePair = state.questions.findEntry(val => {
    return val.id === action.id;
  });

  return state.questions
    .delete(keyValuePair[0])
    .insert(keyValuePair[1], keyValuePair[0]);
}

export default function(state, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return addQuestionToState(state, action);
    case EDIT_TITLE:
      return updateTitle(state, action);
    case MOVE_QUESTION:
      return {
        questions: moveQuestion(state, action),
      };
    default:
      return state;
  }
}
