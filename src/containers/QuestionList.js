import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { List } from 'immutable';
import Question from './Question';
import { AddQuestion } from '../connectors/redux/action-creators/QuestionAC';
import store from '../connectors/redux/store';

export class QuestionList extends React.Component {
  render() {
    const questions = this.props.questions.map(question => {
      return (
        <li key={question.id}>
          <Question qId={question.id} />
        </li>
      );
    });
    if (this.props.connectDropTarget) {
      return this.props.connectDropTarget(
        <div>
          <h3>Drag Here!</h3>
          <ul>{questions}</ul>
        </div>
      );
    }
    return (
      <div>
        <h3>Drag Here!</h3>
        <ul>{questions}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.get('questions'),
  };
}

const specs = {
  drop: () => {
    store.dispatch(AddQuestion('My Question', ['a', 'b', 'c']));
    return undefined;
  },
};

function collector(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export default DropTarget('Choice', specs, collector)(
  connect(mapStateToProps)(QuestionList)
);
