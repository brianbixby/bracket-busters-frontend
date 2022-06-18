let validateGame = game => {
  if(!game._id || !game.homeTeam || !game.awayTeam || !game.dateTime || !game.sportingEventID) {
    throw new Error('VALIDATION ERROR: game requires a id, homeTeam, awayTeam, dateTime and sportingEventID.');
  }
};

let game = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'GAMES_FETCH':
      return payload;
    case 'GAME_UPDATE':
      if(state === []) throw new Error('USAGE ERROR: can not update game not in state');
      validateGame(payload);
      return state.map(game => game._id === payload._id ? payload : game);
    case 'USER_PICK_CREATE':
      return state.filter(game => game._id !== payload.gameID);
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default game;