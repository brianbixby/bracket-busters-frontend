import superagent from 'superagent';

export const commentCreate = comment => ({
  type: 'COMMENT_CREATE',
  payload: comment,
});

export const commentFetch = comment => ({
  type: 'COMMENT_FETCH',
  payload: comment,
});

export const commentsFetch = comments => ({
  type: 'COMMENTS_FETCH',
  payload: comments,
});

export const commentCreateRequest = comment => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/messageboard/${comment.messageBoardID}/comment`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(comment)
    .then(res => {
      dispatch(commentCreate(res.body));
      return res;
    });
};

export const commentFetchRequest = commentID => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.REACT_APP_API_URL}/api/comment/${commentID}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(commentFetch(res.body.data));
      return res;
    });
};

export const commentsFetchRequest = commentsArr => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.REACT_APP_API_URL}/api/comments/messageboard`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(commentsArr)
    .then(res => {
      dispatch(commentsFetch(res.body));
      return res.body;
    });
};