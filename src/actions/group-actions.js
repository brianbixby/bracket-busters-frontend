import superagent from 'superagent';

export const groupCreate = group => ({
  type: 'GROUP_CREATE',
  payload: group,
});

export const groupUpdate = group => ({
  type: 'GROUP_UPDATE',
  payload: group,
});

export const groupFetch = group => ({
  type: 'GROUP_FETCH',
  payload: group,
});

export const groupsFetch = groups => ({
  type: 'GROUPS_FETCH',
  payload: groups,
});

export const allPublicGroupsFetch = groups => ({
  type: 'ALL_PUBLIC_GROUPS_FETCH',
  payload: groups,
});

export const topPublicGroupsFetch = groups => ({
  type: 'TOP_PUBLIC_GROUPS_FETCH',
  payload: groups,
});

export const groupJoin = group => ({
  type: 'GROUP_JOIN',
  payload: group,
});

export const groupDelete = group => ({
  type: 'GROUP_DELETE',
  payload: group,
});

export const groupCreateRequest = group => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/group`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(group)
    .then(res => {
      dispatch(groupCreate(res.body));
      return res;
    });
};

export const groupFetchRequest = group => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/group/${group._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(groupFetch(res.body));
      return res.body;
    });
};

export const groupsFetchRequest = groupsArr => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/groups/user`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(groupsArr)
    .then(res => {
      dispatch(groupsFetch(res.body));
      return res;
    });
};

export const allPublicGroupsFetchRequest = () => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/groups/all/public`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(allPublicGroupsFetch(res.body));
      return res;
    });
};

export const topPublicGroupsFetchRequest = groupsIDArr => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/groups/top`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(groupsIDArr)
    .then(res => {
      dispatch(topPublicGroupsFetch(res.body));
      return res.body;
    });
};

export const groupDeleteRequest = group => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.delete(`${process.env.REACT_APP_API_URL}/api/group/${group._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(groupDelete(group));
      return res;
    });
};

export const groupUpdateRequest = group => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.put(`${process.env.REACT_APP_API_URL}/api/group/${group._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(group)
    .then(res => {
      dispatch(groupUpdate(res.body));
      return res;
    });
};

export const groupJoinRequest = groupID => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.put(`${process.env.REACT_APP_API_URL}/api/group/${groupID}/adduser`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(groupJoin(res.body));
      return res.body;
    });
};

export const privateGroupJoinRequest = credentials => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/group/private/adduser`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(credentials)
    .then(res => {
      dispatch(groupJoin(res.body));
      return res.body;
    });
};