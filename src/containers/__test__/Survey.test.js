import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import ReactDOM from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { Survey } from '../Survey';

describe('Survey', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(DragDropContext(HTML5Backend)(<Survey />), div);
  });
});
