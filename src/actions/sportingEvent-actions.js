import superagent from 'superagent';


export const sportingEventsFetch = sportingEvent => ({
  type: 'SPORTINGEVENTS_FETCH',
  payload: sportingEvent,
});

export const sportingEventsFetchRequest = () => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${__API_URL__}/api/sportingevents`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(sportingEventsFetch(res.body[0]));
      return res.body[0];
    });
};