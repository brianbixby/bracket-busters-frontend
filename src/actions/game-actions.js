import superagent from 'superagent';

export const gamesFetch = games => ({
  type: 'GAMES_FETCH',
  payload: games,
});

export const gameUpdate = game => ({
  type: 'GAME_UPDATE',
  payload: game,
});

export const gameUpdateRequest = game => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.put(`${process.env.REACT_APP_API_URL}/api/game/${game._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(game)
    .then(res => {
      dispatch(gameUpdate(res.body));
      return res.body;
    });
};

export const gamesFetchRequest = (sportingEventID, gamesIDArr) => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/games/${sportingEventID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(gamesIDArr)
    .then(res => {
      dispatch(gamesFetch(res.body));
      return res.body;
    });
};