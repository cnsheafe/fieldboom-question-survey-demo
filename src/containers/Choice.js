import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { AddQuestion } from '../connectors/redux/action-creators/question-creator';
import { ChangeQuestion } from '../connectors/redux/action-creators/current-question-editor';
import '../styles/choice.css';

export class Choice extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    addDefaultQuestion: PropTypes.func,
  };
  render() {
    if (this.props.connectDragSource) {
      return this.props.connectDragSource(
        <div>
          <h1>{this.props.title}</h1>
          <button
            onClick={e => {
              this.props.addDefaultQuestion();
            }}
          >
            ClickMe!
          </button>
        </div>
      );
    }
    return (
      <div className="selection-choice">
        <h1>{this.props.title}</h1>
        <button
          onClick={e => {
            this.props.addDefaultQuestion();
          }}
        >
          ClickMe!
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDefaultQuestion: () => {
      const action = dispatch(AddQuestion('My Question', ['a', 'b', 'c']));
      dispatch(ChangeQuestion(action.id));
    },
  };
}
const cardSource = {
  beginDrag(props) {
    return {
      title: props.title,
    };
  },
};

export default DragSource('Choice', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(connect(null, mapDispatchToProps)(Choice));
