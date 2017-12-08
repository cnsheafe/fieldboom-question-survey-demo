import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import ReactDOM from 'react-dom';
import { Choice } from '../QuestionChoice';

Enzyme.configure({ adapter: new Adapter() });

describe('QuestionList', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Choice title={'hello world'} />, div);
  });
  test('should render a h3 with matching title', () => {
    const title = 'hello world';
    const wrapper = Enzyme.shallow(<Choice title={title} />);
    expect(wrapper.find('h3').text()).toBe(title);
  });
});
