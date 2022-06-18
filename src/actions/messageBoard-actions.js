import superagent from 'superagent';

export const messageBoardFetch = messageBoard => ({
  type: 'MESSAGEBOARD_FETCH',
  payload: messageBoard,
});

export const messageBoardGroupFetchRequest = groupID  => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/messageboard/group/${groupID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(messageBoardFetch(res.body[0]));
      return res.body[0];
    });
};

export const messageBoardLeagueFetchRequest = leagueID  => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/messageboard/league/${leagueID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(messageBoardFetch(res.body[0]));
      return res.body[0];
    });
};