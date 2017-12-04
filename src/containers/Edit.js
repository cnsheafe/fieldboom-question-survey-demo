import React from 'react';
import { connect } from 'react-redux';
import { EditQuestionTitle } from '../connectors/redux/action-creators/question-creator';

const uuid = require('uuid/v4');

export class Edit extends React.Component {
  componentDidUpdate() {
    document.getElementById('edit-question').value = this.props.title;
  }

  handleInputChange(e) {
    e.preventDefault();
    this.props.updateTitle(e.target.value, this.props.id, this.props.answers);
  }

  render() {
    let answers;
    if (this.props.answers) {
      answers = this.props.answers.map(answer => {
        return <li key={uuid()}>{answer}</li>;
      });
    }

    return (
      <section className={this.props.answers ? '' : 'hide'}>
        <h3>Edit</h3>
        <div>
          <label htmlFor="edit-question">Question</label>
          <input id="edit-question" onChange={e => this.handleInputChange(e)} />
        </div>
        <div>
          <h3>Answer Choices</h3>
          <ul>{answers}</ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const currentId = state.get('currentQuestion').get('id');

  if (state.get('questions').size > 0) {
    const question = state.get('questions').find(question => {
      return question.id === currentId;
    });
    if (question) {
      return {
        title: question.title,
        answers: question.answers,
        hidden: false,
        id: question.id,
      };
    }
  }
  return {
    title: null,
    answers: null,
    hidden: true,
    id: '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTitle: (newTitle, id, answers) => {
      dispatch(EditQuestionTitle(newTitle, id, answers));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
