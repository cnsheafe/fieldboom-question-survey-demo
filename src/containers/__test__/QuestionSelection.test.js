import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Selection } from '../QuestionSelection';

Enzyme.configure({ adapter: new Adapter() });

function makeWrapper(mockChoices) {
  return Enzyme.shallow(<Selection choices={mockChoices} />);
}

describe('QuestionSelection', () => {
  let mockChoices = [
    {
      title: 'multi',
      icon: 'my-icon',
    },
  ];

  beforeEach(() => {
    mockChoices = [
      {
        title: 'multi',
        icon: 'my-icon',
      },
    ];
  });

  test('should render without crashing', () => {
    const div = document.createElement('div');

    const root = DragDropContext(HTML5Backend)(
      <Selection choices={mockChoices} />
    );

    ReactDOM.render(root, div);
  });

  test('should render a list', () => {
    const wrapper = makeWrapper(mockChoices);
    expect(wrapper.find('ul')).toHaveLength(1);
  });

  test('should render 2 li when give 2 choices', () => {
    mockChoices.push({
      title: 'short',
      icon: 'short-icon',
    });
    const wrapper = makeWrapper(mockChoices);
    expect(wrapper.find('li').length).toBe(2);
  });

  test('should render 1 img', () => {
    const wrapper = makeWrapper(mockChoices);
    expect(wrapper.find('img')).toHaveLength(1);
  })
});
