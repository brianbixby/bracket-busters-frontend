let currentMessageBoard = (state={}, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'MESSAGEBOARD_FETCH':
      return payload;
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentMessageBoard;