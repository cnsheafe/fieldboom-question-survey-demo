import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import store from '../connectors/redux/store';
import {
  MoveQuestion,
  DeleteQuestion,
} from '../connectors/redux/action-creators/question-list';
import {
  HoverOver,
  CancelHoverOver,
  ChangeQuestion,
} from '../connectors/redux/action-creators/current-question';
import '../styles/questions.css';

const uuid = require('uuid/v4');

/**
 * Represents view component of question as part of the question list
 */
export class Question extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(List).isRequired,
    isCurrent: PropTypes.bool.isRequired,
    qId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    highlight: PropTypes.func,
    deleteThisQuestion: PropTypes.func,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isDragging: PropTypes.bool,
  };

  // Changes current question id to self
  onHighlightQuestion() {
    this.props.highlight(this.props.qId);
  }

  deleteSelf() {
    this.props.deleteThisQuestion(this.props.qId);
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

    // current-question adds styles if this question
    // matches the currentQuestion.id in the store
    const classNameString = `question ${
      this.props.isCurrent ? 'current-question' : ''
    }`;

    const jsxElm = (
      <div className={classNameString}>
        <div className="question-header">
          <span className="question-title">
            <span>{indexString}</span>
            <h3>{this.props.title}</h3>
          </span>
          <span className="question-controls">
            <i
              className="material-icons question-delete"
              onClick={e => this.deleteSelf()}
            >
              delete
            </i>
            <i
              className="material-icons question-edit"
              onClick={e => this.onHighlightQuestion()}
            >
              edit
            </i>
          </span>
        </div>
        <ul className="question-answers">{answers}</ul>
      </div>
    );

    // Registers component as both drag and drop if DnD-connected
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
  let isCurrent = question.id === state.get('currentQuestion').get('id');

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
    deleteThisQuestion: id => {
      dispatch(ChangeQuestion(''));
      dispatch(DeleteQuestion(id));
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
      // Highlight if moving over new question
      store.dispatch(HoverOver(props.qId));
      store.dispatch(ChangeQuestion(props.qId));
    }
    else {
      // Otherwise highlight the source question
      store.dispatch(HoverOver(draggedId));
      store.dispatch(ChangeQuestion(draggedId));
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
  // Remove highlight if not hovering over valid question
  if (!monitor.isOver()) {
    store.dispatch(CancelHoverOver());
  }
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

// Connects components to both Redux store and DnD
export default connect(mapStateToProps, mapDispatchToProps)(
  DropTarget('Question', cardTarget, collector)(
    DragSource('Question', cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }))(Question)
  )
);
