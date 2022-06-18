let validateUserPick = userPick => {
  if(!userPick._id || !userPick.userID || !userPick.leagueID || !userPick.gameID) {
    throw new Error('VALIDATION ERROR: userPick requires a id, userID, leagueID, gameID, and pick.');
  }
};

let userPick = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'USER_PICK_UPDATE':
      if(state === []) throw new Error('USAGE ERROR: can not update a userpick not in state');
      validateUserPick(payload);
      return state.map(userPick => userPick._id === payload._id ? payload : userPick);
    case 'USER_PICKS_FETCH':
      return payload;
    case 'USER_PICK_FETCH':
      return [payload, ...state];
    case 'USER_PICK_CREATE':
      validateUserPick(payload);
      return state;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default userPick;