import React from 'react';
import { Choice } from './Choice';

export class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.choices = props.choices;
  }
  render() {
    const listOfChoices = this.choices.map((choice, index) => {
      return (
        <li key={index}>
          <Choice title={choice.title} icon={choice.icon} />
        </li>
      );
    });
    return <nav>{listOfChoices}</nav>;
  }
}
