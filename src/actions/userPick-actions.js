import superagent from 'superagent';

export const userPickCreate = userPick => ({
  type: 'USER_PICK_CREATE',
  payload: userPick,
});

export const userPickUpdate = userPick => ({
  type: 'USER_PICK_UPDATE',
  payload: userPick,
});

export const userPicksFetch = userPicks => ({
  type: 'USER_PICKS_FETCH',
  payload: userPicks,
});

export const userPickFetch = userPick => ({
  type: 'USER_PICK_FETCH',
  payload: userPick,
});

export const userPickCreateRequest = userPick => (dispatch, getState) => {
  let { userAuth } = getState();

  return superagent.post(`${process.env.REACT_APP_API_URL}/api/league/${userPick.leagueID}/userpick`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(userPick)
    .then( res => {
      dispatch(userPickCreate(res.body));
      return res.body;
    });
};

export const userPickUpdateRequest = userPick => (dispatch, getState) => {
  let { userAuth } = getState();
  
  return superagent.put(`${process.env.REACT_APP_API_URL}/api/userpick/${userPick._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(userPick)
    .then( res => {
      dispatch(userPickUpdate(res.body));
      return res.body;
    });
};

export const userPicksFetchRequest = leagueID  => (dispatch, getState) => {
  let { userAuth } = getState();

  return superagent.get(`${process.env.REACT_APP_API_URL}/api/userpicks/${leagueID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(userPicksFetch(res.body));
      return res.body;
    });
};

export const userPickFetchRequest = userPickID  => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/userpick/${userPickID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(userPickFetch(res.body));
      return res.body;
    });
};