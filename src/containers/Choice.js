import React from 'react';
import { connect } from 'react-redux';
import { AddQuestion } from '../connectors/redux/action-creators/QuestionAC';

export class Choice extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        <button
          onClick={e => {
            this.props.addDefaultQuestion();
          }}
        >
          ClickMe!
        </button>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addDefaultQuestion: () => {
      dispatch(AddQuestion('My Question', ['a', 'b', 'c']));
    },
  };
}

export default connect(null, mapDispatchToProps)(Choice);
