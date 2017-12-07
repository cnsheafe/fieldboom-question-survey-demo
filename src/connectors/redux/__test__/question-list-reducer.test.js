import { List } from 'immutable';
import reducer from '../reducers/question-list-reducer';
import {
  AddQuestion,
  DeleteQuestion,
  EditQuestion,
  MoveQuestion,
} from '../action-creators/question-list';

describe('Question List Reducer', () => {
  let state = List();
  beforeEach(() => {
    state = List();
  });

  const firstTitle = 'hello world';
  const firstAnswers = List([1, 2, 3]);
  const secondTitle = 'goodbye all';
  const secondAnswers = List(['a', 'b', 'c']);

  describe('addQuestionToState', () => {
    test('should return state as non-empty list', () => {
      const title = 'hello world';
      const answers = List([1, 2, 3]);
      const action = AddQuestion(title, answers);
      const newState = reducer(state, action);
      expect(newState.size).toBe(1);
      expect(newState.first().title).toBe(title);
      expect(newState.first().answers).toBe(answers);
    });
  });
  describe('deleteQuestion', () => {
    test('should return state with 1 item that started with 2', () => {
      const firstAction = AddQuestion(firstTitle, firstAnswers);
      const secondAction = AddQuestion(secondTitle, secondAnswers);
      const deleteAction = DeleteQuestion(secondAction.id);

      let newState = reducer(state, firstAction);
      newState = reducer(newState, secondAction);
      expect(newState.size).toBe(2);

      newState = reducer(newState, deleteAction);
      expect(newState.size).toBe(1);
      expect(newState.first().title).toBe(firstTitle);
      expect(newState.first().answers).toBe(firstAnswers);
    });
  });
  describe('updateQuestion', () => {
    const newTitle = 'booh';
    const oldTitle = 'hello world';
    const oldAnswers = List([1, 2, 3]);

    test('should return state with updated title', () => {
      const addAction = AddQuestion(oldTitle, oldAnswers);
      let newState = reducer(state, addAction);

      const updateAction = EditQuestion(
        newTitle,
        addAction.id,
        addAction.answers
      );
      newState = reducer(newState, updateAction);
      expect(newState.first().title).toBe(newTitle);
    });
  });

  describe('moveQuestion', () => {
    const firstAction = AddQuestion(firstTitle, firstAnswers);
    const secondAction = AddQuestion(secondTitle, secondAnswers);

    let newState = reducer(state, firstAction);
    newState = reducer(newState, secondAction);

    const moveAction = MoveQuestion(secondAction.id, 0);
    newState = reducer(newState, moveAction);
    expect(newState.first().id).toBe(secondAction.id);
    expect(newState.last().id).toBe(firstAction.id);
  });
});
