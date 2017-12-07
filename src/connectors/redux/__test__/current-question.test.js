import {
  CHANGE_QUESTION,
  HOVER_ON_QUESTION,
  CANCEL_HOVER,
  ChangeQuestion,
  HoverOver,
  CancelHoverOver,
} from '../action-creators/current-question';

describe('Current Question Action Creator', () => {
  const id = 'hello';
  describe('ChangeQuestion', () => {
    test('should return a valid CHANGE_QUESTION action', () => {
      const mock = {
        type: CHANGE_QUESTION,
        id: id,
      };
      const action = ChangeQuestion(id);
      expect(action).toEqual(mock);
    });
  });

  describe('HoverOver', () => {
    test('should return a valid HOVER_ON_QUESTION action', () => {
      const mock = {
        type: HOVER_ON_QUESTION,
        id: id,
      };
      const action = HoverOver(id);
      expect(action).toEqual(mock);
    });
  });
  describe('CancelHoverOver', () => {
    test('should return a valid CANCEL_HOVER action', () => {
      const mock = {
        type: CANCEL_HOVER
      };
      const action = CancelHoverOver();
      expect(action).toEqual(mock);
    })
  })
});
