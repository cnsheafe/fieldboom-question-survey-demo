import React from 'react';
import Choice from './Choice';
import '../styles/selection.css';
import logoImg from '../assets/favicon.png';

const uuid = require('uuid/v4');

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
          <span><img src={logoImg} alt="Fieldboom icon" /></span>
          <h2>Fieldboom</h2>
        </div>
        <div>
          <span>arrow icon</span>
          <span className="back-to-forms">BACK TO YOUR FORMS</span>
        </div>
        <ul>{listOfChoices}</ul>
      </section>
    );
  }
}
