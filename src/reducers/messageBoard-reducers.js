let validateLeague = league => {
  if(!league._id || !league.leagueName || !league.sportingEventID || !league.owner || !league.scoring || !league.poolSize || !league.privacy) {
    throw new Error('VALIDATION ERROR: league requires a id, name, sportingeventid, owner, scoring, poolsize and privacy.');
  }
};

let messageBoard = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'MESSAGEBOARD_FETCH':
      return [payload, ...state];
    case 'LEAGUE_DELETE':
      if(state === []) throw new Error('USAGE ERROR: can not delete league not in state');
      validateLeague(payload);
      return state.filter(league => league._id !== payload._id);
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default messageBoard;