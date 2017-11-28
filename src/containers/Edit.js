import React from 'react';

export class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.answers = props.answers;
  }
  render() {
    const answers = this.answers.map(answer => {
      return <li>{answer}</li>;
    });

    return (
      <section>
        <h3>Edit</h3>
        <div>
          <label htmlFor="edit-question">Question</label>
          <input id="edit-question" />
        </div>
        <div>
          <h3>Answer Choices</h3>
          <ul>{answers}</ul>
        </div>
      </section>
    );
  }
}
