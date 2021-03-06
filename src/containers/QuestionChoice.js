import React from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import '../styles/choice.css';

/**
 * Represents view component for a single question selection choice
 */
export class Choice extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
  };
  render() {
    const jsxElm = (
      <div className="selection-choice">
        <div className="icon">
          <i className="material-icons white-icon">{this.props.icon}</i>
        </div>
        <h3>{this.props.title}</h3>
      </div>
    );

    if (this.props.connectDragSource) {
      return this.props.connectDragSource(jsxElm);
    }
    return jsxElm;
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      title: props.title,
    };
  },
};

// Component is meant to be dragged over canvas to add a default question to the list
export default DragSource('Choice', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Choice);
