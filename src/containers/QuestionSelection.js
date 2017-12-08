import React from 'react';
import Choice from './QuestionChoice';
import '../styles/selection.css';
import logoImg from '../assets/logo-blog.png';

const uuid = require('uuid/v4');

/**
 * A view component to handle a variety of question choices
 */
export class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.choices = props.choices;
  }
  render() {
    const listOfChoices = this.choices.map(choice => {
      return (
        <li key={uuid()}>
          <Choice title={choice.title} icon={choice.icon} />
        </li>
      );
    });

    return (
      <section className="selection-of-choices">
        <div>
          <img src={logoImg} alt="Fieldboom icon" />
        </div>
        <div className="back-to-forms">
          <span><i className="material-icons small-arrow">keyboard_backspace</i></span>
          <span>BACK TO YOUR FORMS</span>
        </div>
        <ul>{listOfChoices}</ul>
      </section>
    );
  }
}
