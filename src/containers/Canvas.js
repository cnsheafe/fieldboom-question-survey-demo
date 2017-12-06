import React from 'react';
import QuestionList from './QuestionList';
import '../styles/canvas.css';

export class Canvas extends React.Component {
  render() {
    return (
      <section className="canvas">
        <div className="canvas-header">
          <h1>Customer Satisfaction Survey</h1>
          <span className="canvas-form">
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

        <nav>
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
