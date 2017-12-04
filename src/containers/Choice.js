import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { AddQuestion } from '../connectors/redux/action-creators/question-creator';
import { ChangeQuestion } from '../connectors/redux/action-creators/current-question-editor';

const cardSource = {
  beginDrag(props) {
    return {
      title: props.title,
    };
  },
};
export class Choice extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
  };
  render() {
    if (this.props.connectDragSource) {
      return this.props.connectDragSource(
        <div>
          {this.props.title}
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
      <div>
        {this.props.title}
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

export default DragSource('Choice', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(connect(null, mapDispatchToProps)(Choice));
