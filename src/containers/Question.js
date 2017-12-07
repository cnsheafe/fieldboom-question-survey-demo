import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import store from '../connectors/redux/store';
import { MoveQuestion } from '../connectors/redux/action-creators/question-creator';
import '../styles/questions.css';

const uuid = require('uuid/v4');

export class Question extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(List).isRequired,
    qId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isDragging: PropTypes.bool,
  };

  render() {
    const indexString = `Q${this.props.index + 1}`;

    const answers = this.props.answers.map(answer => {
      return (
        <li key={uuid()}>
          <span>{answer}</span>
        </li>
      );
    });

    const jsxElm = (
      <div className="question">
        <div className="question-header">
          <span>{indexString}</span>
          <h3>{this.props.title}</h3>
        </div>
        <ul className="question-answers">{answers}</ul>
      </div>
    );

    if (this.props.connectDragSource && this.props.connectDropTarget) {
      return this.props.connectDropTarget(
        this.props.connectDragSource(
          <div className={this.props.isDragging ? 'hide' : ''}>{jsxElm}</div>
        )
      );
    }
    return <div>{jsxElm}</div>;
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

const cardSource = {
  beginDrag(props) {
    return {
      sourceId: props.qId,
    };
  },
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().sourceId;
    if (draggedId !== props.qId) {
      store.dispatch(MoveQuestion(draggedId, props.index));
    }
  },
};

export default DropTarget('Question', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('Question', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(connect(mapStateToProps)(Question))
);
