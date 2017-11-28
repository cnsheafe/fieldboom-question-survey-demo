import React from 'react';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.index = props.info.index;
    this.text = props.info.text;
    this.answers = props.info.answers;
  }
  render() {
    const answers = this.answers.map(answer => {
      return <li>{answer}</li>;
    });
    return (
      <div>
        <div>
          <span>Q{this.index}</span>
          <h3>{this.text}</h3>
        </div>
        <ul>{answers}</ul>
      </div>
    );
  }
}
