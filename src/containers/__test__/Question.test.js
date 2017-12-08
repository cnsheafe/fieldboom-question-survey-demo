import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import ReactDOM from 'react-dom';

import { Question } from '../Question';

Enzyme.configure({ adapter: new Adapter() });

function makeWrapper(
  title = 'hello',
  answers = List(['a', 'b', 'c']),
  qId = 'bleh',
  isCurrent = true,
  index = 0
) {
  return Enzyme.shallow(
    <Question
      title={title}
      answers={answers}
      qId={qId}
      isCurrent={true}
      index={0}
    />
  );
}

describe('Question', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Question
        title={'hello'}
        answers={List()}
        isCurrent={true}
        qId={'bleh'}
        index={0}
      />,
      div
    );
  });
  test('should render a list', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  test('should render 3 li by default', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('li')).toHaveLength(3);
  });
});
