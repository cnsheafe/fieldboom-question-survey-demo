import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Question from './Question';
import { AddQuestion } from '../connectors/redux/action-creators/question-list';
import store from '../connectors/redux/store';
import { ChangeQuestion } from '../connectors/redux/action-creators/current-question';
import '../styles/questions.css';

/**
 * A view component for displaying a list of questions.
 */
export class QuestionList extends React.Component {
  static propTypes = {
    questions: PropTypes.objectOf(List).isRequired,
    connectDropTarget: PropTypes.func,
  };

  render() {
    const questions = this.props.questions.map((question, index) => {
      return (
        <li key={question.id}>
          <Question qId={question.id} index={index} />
        </li>
      );
    });

    const jsxElm = (
      <div className="question-list">
        <ul>{questions}</ul>
        <div className="question-drop">
          <div className="circle">
            <div className="line" />
            <div className="line-vertical" />
          </div>
          <div className="question-drop-text">
            <h4>Add a Question</h4>
            <p>Drag a question from the left and drop it here</p>
          </div>
        </div>
      </div>
    );

    if (this.props.connectDropTarget) {
      return this.props.connectDropTarget(jsxElm);
    }
    return jsxElm;
  }
}

function mapStateToProps(state) {
  return {
    questions: state.get('questions'),
  };
}

const specs = {
  drop: () => {
    const action = AddQuestion('Which country do you live in?', [
      'United States',
      'Canada',
      'Australia',
    ]);
    store.dispatch(action);
    store.dispatch(ChangeQuestion(action.id));
    // We are not using anything from the return at the moment
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
