import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { EditQuestion } from '../connectors/redux/action-creators/question-list';
import '../styles/edit.css';

const uuid = require('uuid/v4');

/**
 * Represents view component for editing highlighted question
 */
export class Edit extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(List).isRequired,
  }
  // Prevents re-rendering of component when changing inputs
  // So focus is maintained on input when editing
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.id === this.props.id &&
      nextProps.answers.size === this.props.answers.size
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    document.getElementById('edit-question').value = this.props.title;
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.props.updateQuestion(
      e.target.value,
      this.props.id,
      this.props.answers
    );
  }

  handleAnswerChange(e) {
    e.preventDefault();
    const newAnswer = e.target.value;
    const index = e.target.dataset.index;
    const newAnswers = this.props.answers.set(index, newAnswer);
    this.props.updateQuestion(this.props.title, this.props.id, newAnswers);
  }

  handleAddAnswer(e) {
    e.preventDefault();
    const newAnswer = e.target.dataset.answer;
    const index = e.target.dataset.index;
    const newAnswers = this.props.answers.insert(index, newAnswer);
    this.props.updateQuestion(this.props.title, this.props.id, newAnswers);
  }

  handleRemoveAnswer(e) {
    e.preventDefault();
    const index = e.target.dataset.index;
    const newAnswers = this.props.answers.delete(index);
    this.props.updateQuestion(this.props.title, this.props.id, newAnswers);
  }

  render() {
    let answers;
    if (this.props.answers) {
      answers = this.props.answers.map((answer, index) => {
        return (
          <li key={uuid()} className="edit-answer-item">
            <span className="edit-reorder-answers">
              <i className="fa fa-sort" aria-hidden="true" />
            </span>
            <span>
              <input
                className="edit-answer"
                data-index={index}
                defaultValue={answer}
                onChange={e => this.handleAnswerChange(e)}
              />
            </span>
            <span>
              <i
                role="button"
                data-index={index}
                data-answer={answer}
                className="material-icons green-add"
                onClick={e => this.handleAddAnswer(e)}
              >
                add_circle
              </i>
              <i
                role="button"
                data-index={index}
                data-answer={answer}
                className="material-icons red-remove"
                onClick={e => this.handleRemoveAnswer(e)}
              >
                remove_circle
              </i>
            </span>
          </li>
        );
      });
    }

    return (
      <section className={this.props.answers ? 'edit' : 'hide'}>
        <div className="edit-header">
          <span>{`Q${this.props.index}`}</span>
          <h3>Multi Choice</h3>
        </div>
        <div className="edit-question-text">
          <label htmlFor="edit-question">Question</label>
          <textarea
            id="edit-question"
            defaultValue={this.props.title || ''}
            rows="5"
            onChange={e => this.handleTitleChange(e)}
          />
        </div>
        <div className="edit-answers">
          <h3>Answer Choices</h3>
          <ul>{answers}</ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const currentId = state.get('currentQuestion').get('id');

  // Checks if no id has been set
  // If true, set the first question as default
  if (currentId === '' && state.get('questions').size > 0) {
    const question = state.get('questions').first();
    return {
      title: question.title,
      answers: question.answers,
      id: question.id,
      index: 1,
    };
  }

  if (state.get('questions').size > 0) {
    const [index, question] = state.get('questions').findEntry(question => {
      return question.id === currentId;
    });

    if (question) {
      return {
        title: question.title,
        answers: question.answers,
        id: question.id,
        index: index + 1,
      };
    }
  }
  return {
    title: null,
    answers: null,
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
