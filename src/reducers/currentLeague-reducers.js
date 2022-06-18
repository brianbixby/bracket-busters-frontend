let currentLeague = (state={}, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'LEAGUE_FETCH':
      return payload;
    case 'LEAGUE_CREATE':
      return payload;
    case 'LEAGUE_JOIN':
      return payload;
    case 'LEAGUE_UPDATE':
      if(state === {}) throw new Error('USAGE ERROR: can not update league not in state, currentLeague reducer');
      return payload;
    case 'LEAGUE_DELETE':
      if(state === {}) throw new Error('USAGE ERROR: can not delete league not in state, currentLeague reducer');
      return {};
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentLeague;