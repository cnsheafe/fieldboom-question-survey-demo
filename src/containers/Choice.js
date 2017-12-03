import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { AddQuestion } from '../connectors/redux/action-creators/QuestionAC';

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
      dispatch(AddQuestion('My Question', ['a', 'b', 'c']));
    },
  };
}

export default DragSource('Choice', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(connect(null, mapDispatchToProps)(Choice));
