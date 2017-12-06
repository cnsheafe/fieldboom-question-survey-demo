import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Selection } from './Selection';
import { Canvas } from './Canvas';
import Edit from './Edit';
import '../styles/home.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.defaultchoices = [{ title: 'multi-choice', icon: 'multi' }];
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

export default DragDropContext(HTML5Backend)(Home);
