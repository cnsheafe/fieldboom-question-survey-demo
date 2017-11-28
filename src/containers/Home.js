import React from 'react';
//
import { Selection } from './Selection';
import { QuestionList } from './QuestionList';
import { Edit } from './Edit';
import '../styles/home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.defaultchoices = [{ title: 'multi-choice', icon: 'multi' }];
    this.defaultquestions = [
      { text: 'hello', index: 1, answers: ['a', 'b', 'c'] },
    ];
    this.defaultAnswers = this.defaultquestions[0].answers;
  }

  render() {
    return (
      <div className="home">
        <h1>Welcome to </h1>
        <Selection choices={this.defaultchoices} />
        <QuestionList questions={this.defaultquestions} />
        <Edit answers={this.defaultAnswers} />
      </div>
    );
  }
}
