import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export class Question extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(List).isRequired,
  };

  render() {
    const answers = this.props.answers.map(answer => {
      return <li>{answer}</li>;
    });
    return (
      <div>
        <div>
          <span>Q</span>
          <h3>{this.props.title}</h3>
        </div>
        <ul>{answers}</ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const questionList = state.get('questions');
  const question = questionList.find(question => {
    return question.id === ownProps.qId;
  });

  return {
    answers: question.answers,
    title: question.title,
  };
}

export default connect(mapStateToProps)(Question);
