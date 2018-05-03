import superagent from 'superagent';

export const scoreBoardsFetch = scoreBoards => ({
  type: 'SCOREBOARDS_FETCH',
  payload: scoreBoards,
});

export const topScoresFetch = scores => ({
  type: 'TOP_SCORES_FETCH',
  payload: scores,
});

export const scoreBoardsFetchRequest = leagueID => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${__API_URL__}/api/scoreboards/${leagueID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(scoreBoardsFetch(res.body));
      return res.body;
    });
};

export const topScoresFetchRequest = sportingeventID => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${__API_URL__}/api/scoreboards/sportingevent/${sportingeventID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      console.log('res.body: ', res.body);
      dispatch(topScoresFetch(res.body));
      return res.body;
    });
};