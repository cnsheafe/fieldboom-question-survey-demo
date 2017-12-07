import { Map } from 'immutable';

import reducer, { changeQuestion } from '../reducers/current-question-reducer';
import { ChangeQuestion, HoverOver, CancelHoverOver } from '../action-creators/current-question';

describe('Current Question Reducer', () => {
  let state = Map({ id: 'hello', next: 'world' });
  beforeEach(() => {
    state = state.set('id', 'hello');
    state = state.set('next', 'world');
  });

  describe('changeQuestion', () => {
    test('should return a new state with id changed', () => {
      const newId = 'bye';
      const action = ChangeQuestion(newId);
      const newState = reducer(state, action);
      expect(newState.get('id')).toBe(newId);
    });
  });
  describe('hoverOver', () => {
    test('should return a new state with next changed', () => {
      const newId = 'dlrow';
      const action = HoverOver(newId);
      const newState = reducer(state, action);
      expect(newState.get('next')).toBe(newId);
    });
  })
  describe('cancelHoverOver', () => {
    test('should return a new state with next is empty string', () => {
      const action = CancelHoverOver();
      const newState = reducer(state, action);
      expect(newState.get('next')).toBe('');
    })
  })
});
