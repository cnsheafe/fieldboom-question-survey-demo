export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const HOVER_ON_QUESTION = 'HOVER_QUESTION';
export const CANCEL_HOVER = 'CANCEL_HOVER_QUESTION';


export function ChangeQuestion(qId) {
  const action = {
    type: CHANGE_QUESTION,
    id: qId,
  }
  return action;
}


export function HoverOver(qId) {
  const action = {
    type: HOVER_ON_QUESTION,
    id: qId,
  }
  return action;
}

export function CancelHoverOver() {
  const action = {
    type: CANCEL_HOVER,
  }
  return action;
}

