import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import { QuestionList } from '../QuestionList';

Enzyme.configure({ adapter: new Adapter() });

describe('QuestionList', () => {
  test('should render a list', () => {
    const wrapper = Enzyme.shallow(<QuestionList questions={List()} />);
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  test('should render 2 li given 2 questions', () => {
    const questions = List([{ id: 'hello' }, { id: 'bye' }]);
    const wrapper = Enzyme.shallow(<QuestionList questions={questions} />);
    expect(wrapper.find('li')).toHaveLength(2);
  });
});
