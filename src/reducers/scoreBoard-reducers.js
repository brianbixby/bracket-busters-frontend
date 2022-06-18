let scoreboard = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'SCOREBOARDS_FETCH':
      return payload;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default scoreboard;