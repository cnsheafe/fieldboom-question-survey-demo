export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const HOVER_ON_QUESTION = 'HOVER_QUESTION';
export const CANCEL_HOVER = 'CANCEL_HOVER_QUESTION';


/**
 * Create action to change current question to edit
 * @param {string} qId Question Id
 */
export function ChangeQuestion(qId) {
  const action = {
    type: CHANGE_QUESTION,
    id: qId,
  }
  return action;
}

/**
 * Create action to highlight specific question
 * @param {string} qId Question id
 */
export function HoverOver(qId) {
  const action = {
    type: HOVER_ON_QUESTION,
    id: qId,
  }
  return action;
}

/**
 * Create action to clear the focused question
 */
export function CancelHoverOver() {
  const action = {
    type: CANCEL_HOVER,
  }
  return action;
}

