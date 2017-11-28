import React from 'react';
import { Question } from './Question';

export class QuestionList extends React.Component {
  render() {
    const questions = this.props.questions.map((question, index) => {
      return (
        <li key={index}>
          <Question info={question} />
        </li>
      );
    });
    return <ul>{questions}</ul>;
  }
}
