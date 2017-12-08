import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';
import '../styles/canvas.css';

/**
 * Represents Presentation View component for central section of app
 */
export class Canvas extends React.Component {
  static myProps = {
    highlight: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <section className="canvas">
        <div className="canvas-header">
          <h1>Customer Satisfaction Survey</h1>
          <span
            className={
              this.props.highlight ? 'canvas-form highlight' : 'canvas-form'
            }
          >
            <span className="canvas-preview">
              <i className="material-icons icon-text-gray">remove_red_eye</i>
              <span>Preview</span>
            </span>
            <span className="canvas-submit">
              <i className="material-icons">redo</i>
              <span>Publish Form</span>
            </span>
          </span>
        </div>

        <nav className="canvas-nav">
          <ul>
            <li>
              <a>Questions</a>
            </li>
            <li>
              <a>Design</a>
            </li>
            <li>
              <a>Welcome Page</a>
            </li>
            <li>
              <a>Thank You Page</a>
            </li>
            <li>
              <a>Options</a>
            </li>
          </ul>
        </nav>
        <QuestionList />
      </section>
    );
  }
}

// Mapping for conditionally highlighting preview/submit buttons
function mapStateToProps(state) {
  return {
    highlight: state.get('questions').size > 0,
  };
}

export default connect(mapStateToProps)(Canvas);
