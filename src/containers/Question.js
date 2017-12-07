import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import store from '../connectors/redux/store';
import { MoveQuestion } from '../connectors/redux/action-creators/question-creator';
import {
  HoverOver,
  CancelHoverOver,
  ChangeQuestion,
} from '../connectors/redux/action-creators/current-question-editor';
import '../styles/questions.css';

const uuid = require('uuid/v4');

export class Question extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(List).isRequired,
    isCurrent: PropTypes.bool.isRequired,
    qId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    highlight: PropTypes.func,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isDragging: PropTypes.bool,
  };

  onHighlightQuestion() {
    this.props.highlight(this.props.qId);
  }

  render() {
    const indexString = `Q${this.props.index + 1}`;

    const answers = this.props.answers.map(answer => {
      return (
        <li key={uuid()}>
          <span>{answer}</span>
        </li>
      );
    });

    const classNameString = `question ${
      this.props.isCurrent ? 'current-question' : ''
    }`;

    const jsxElm = (
      <div
        className={classNameString}
        onClick={e => this.onHighlightQuestion()}
      >
        <div className="question-header">
          <span className="question-title">
            <span>{indexString}</span>
            <h3>{this.props.title}</h3>
          </span>
          <span className="question-controls">
            <i className="material-icons question-delete">delete</i>
            <i className="material-icons question-edit">edit</i>
          </span>
        </div>
        <ul className="question-answers">{answers}</ul>
      </div>
    );

    if (this.props.connectDragSource && this.props.connectDropTarget) {
      return this.props.connectDropTarget(
        this.props.connectDragSource(
          <div className={this.props.isDragging ? 'dim' : ''}>{jsxElm}</div>
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
  const isCurrent = question.id === state.get('currentQuestion').get('id');

  return {
    answers: question.answers,
    title: question.title,
    isCurrent: isCurrent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    highlight: id => {
      dispatch(ChangeQuestion(id));
    },
  };
}

const cardSource = {
  beginDrag(props) {
    return {
      sourceId: props.qId,
      text: props.title,
    };
  },
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().sourceId;
    if (draggedId !== props.qId) {
      store.dispatch(HoverOver(props.qId));
      store.dispatch(ChangeQuestion(props.qId));
    }
  },
  drop(props, monitor) {
    const draggedId = monitor.getItem().sourceId;
    if (draggedId !== props.qId) {
      store.dispatch(MoveQuestion(draggedId, props.index));
    }
    store.dispatch(ChangeQuestion(draggedId));

    store.dispatch(CancelHoverOver());
  },
};

function collector(connect, monitor) {
  if (!monitor.isOver()) {
    store.dispatch(CancelHoverOver());
  }
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DropTarget('Question', cardTarget, collector)(
    DragSource('Question', cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }))(Question)
  )
);
