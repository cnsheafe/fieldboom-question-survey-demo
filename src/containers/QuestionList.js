import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Question from './Question';

export class QuestionList extends React.Component {
  render() {
    const questions = this.props.questions.map(question => {
      return (
        <li key={question.id}>
          <Question qId={question.id} />
        </li>
      );
    });
    return <ul>{questions}</ul>;
  }
}

function mapStateToProps(state) {
  return {
    questions: state.get('questions'),
  };
}

export default connect(mapStateToProps)(QuestionList);
