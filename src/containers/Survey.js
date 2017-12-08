import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Selection } from './QuestionSelection';
import Canvas from './Canvas';
import Edit from './Edit';
import '../styles/home.css';

/**
 * Returns a DnD Context-Container for the entire app
 */
export class Survey extends React.Component {
  constructor(props) {
    super(props);
    // Only one choice that needs implementation :)
    this.defaultchoices = [{ title: 'Multi Choice', icon: 'view_list' }];
  }

  render() {
    return (
      <div className="home">
        <Selection choices={this.defaultchoices} />
        <Canvas />
        <Edit />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Survey);
