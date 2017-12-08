import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import ReactDOM from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { Canvas } from '../Canvas';

Enzyme.configure({ adapter: new Adapter() });

function makeWrapper(highlight = true) {
  return Enzyme.shallow(<Canvas highlight={highlight} />);
}

describe('Canvas', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    const context = DragDropContext(HTML5Backend)(<Canvas highlight />);
    ReactDOM.render(context, div);
  });
  test('should render a nav',  () => {
    const wrapper = makeWrapper(true);
    expect(wrapper.find('nav')).toHaveLength(1);
  });
});
