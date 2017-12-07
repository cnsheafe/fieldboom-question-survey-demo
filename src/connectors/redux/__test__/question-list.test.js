import { List } from 'immutable';
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  AddQuestion,
  DeleteQuestion,
  EditQuestion,
  MoveQuestion,
  MOVE_QUESTION,
} from '../action-creators/question-list';

describe('question-list action creator', () => {
  describe('AddQuestion', () => {
    const title = 'hello';
    const arr = [1, 2, 3];
    test('should return a valid ADD_QUESTION action', () => {
      const action = AddQuestion(title, arr);
      expect(action.type).toBe(ADD_QUESTION);
      expect(action.title).toBe(title);
      expect(action.answers).toEqual(List(arr));
      expect(typeof action.id).toBe('string');
    });
  });

  describe('DeleteQuestion', () => {
    const id = 'hello';
    test('should return a valid DELETE_QUESTION action', () => {
      const action = DeleteQuestion(id);
      expect(action.type).toBe(DELETE_QUESTION);
      expect(action.id).toBe(id);
    });
  });

  describe('EditQuestion', () => {
    const newTitle = 'My new text';
    const id = 'edit';
    const newAnswers = [1, 2, 3];
    test('should return a valid EDIT_QUESTION', () => {
      const action = EditQuestion(newTitle, id, newAnswers);
      expect(action.type).toBe(EDIT_QUESTION);
      expect(action.title).toBe(newTitle);
      expect(action.id).toBe(id);
      expect(action.answers).toEqual(List(newAnswers));
    });
  });
  describe('MoveQuestion', () => {
    const id = 'hello';
    const index = 2;
    test('should return a valid MOVE_QUESTION', () => {
      const action = MoveQuestion(id, index);
      expect(action.type).toBe(MOVE_QUESTION);
      expect(action.id).toBe(id);
      expect(action.index).toBe(index);
    })
  })
});
