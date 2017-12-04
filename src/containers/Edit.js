import React from 'react';
import { connect } from 'react-redux';
import { EditQuestion } from '../connectors/redux/action-creators/question-creator';

const uuid = require('uuid/v4');

export class Edit extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.id === this.props.id) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    document.getElementById('edit-question').value = this.props.title;
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.props.updateQuestion(e.target.value, this.props.id, this.props.answers);
  }

  handleAnswerChange(e) {
    e.preventDefault();
    const newAnswer = e.target.value;
    const index = e.target.dataset.index;
    console.log(this.props.answers);
    const newAnswers = this.props.answers.set(index, newAnswer);
    this.props.updateQuestion(this.props.title, this.props.id, newAnswers);
  }

  render() {
    let answers;
    if (this.props.answers) {
      answers = this.props.answers.map((answer, index) => {
        return (
          <li key={uuid()}>
            <span>
              <input
                className="edit-answer"
                data-index={index}
                defaultValue={answer}
                onChange={e => this.handleAnswerChange(e)}
              />
            </span>
            <span>
              <button>Add</button>
              <button>Remove</button>
            </span>
          </li>
        );
      });
    }

    return (
      <section className={this.props.answers ? '' : 'hide'}>
        <h3>Edit</h3>
        <div>
          <label htmlFor="edit-question">Question</label>
          <input
            id="edit-question"
            defaultValue={this.props.title || ''}
            onChange={e => this.handleTitleChange(e)}
          />
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
    updateQuestion: (title, id, answers) => {
      dispatch(EditQuestion(title, id, answers));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
