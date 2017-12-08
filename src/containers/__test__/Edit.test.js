import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import ReactDOM from 'react-dom';
import { Edit } from '../Edit';

Enzyme.configure({ adapter: new Adapter() });

function makeWrapper(
  title = 'hello',
  id = 'bleh',
  answers = List(['a', 'b', 'c'])
) {
  return Enzyme.shallow(<Edit title={title} id={id} answers={answers} />);
}

describe('Edit', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Edit title={'hello'} id={'bleh'} answers={List()} />, div);
  });
  test('should render a list', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  test('should render 3 li by default', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('li')).toHaveLength(3);
  });
  test('should have root with class "edit"', () => {
    const wrapper = makeWrapper();
    expect(wrapper.first().hasClass('edit')).toBe(true);
  })
});
