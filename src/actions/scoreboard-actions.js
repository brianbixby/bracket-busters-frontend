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
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/scoreboards/${leagueID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(scoreBoardsFetch(res.body));
      return res.body;
    });
};

export const topScoresFetchRequest = sportingeventID => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/scoreboards/sportingevent/${sportingeventID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(topScoresFetch(res.body));
      return res.body;
    });
};