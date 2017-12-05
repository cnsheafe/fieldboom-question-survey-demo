import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Selection } from './Selection';
import QuestionList from './QuestionList';
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
        <h1>Welcome to </h1>
        <Selection choices={this.defaultchoices} />
        <QuestionList />
        <Edit />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Home);
