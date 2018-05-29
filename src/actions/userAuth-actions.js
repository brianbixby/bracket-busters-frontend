import superagent from 'superagent';
import * as util from '../lib/util.js';

export const signIn = token => ({
  type: 'SIGN_IN',
  payload: token,
});

export const signOut = () => {
  process.env.NODE_ENV === 'production' ? util.deleteCookie('Bracket-Busters-Token') : delete localStorage.token;
  return { type: 'SIGN_OUT' };
};

export const signUpRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/api/signup`)
    .withCredentials()
    .send(user)
    .then( res => {
      dispatch(signIn(res.text));
      if(process.env.NODE_ENV === 'production') {
        try {
          util.createCookie('Bracket-Busters-Token', res.text.token, 30);
        } catch (err) {
          console.error(err);
        }
      }
      else {
        localStorage.token = res.text;
      }
      return res;
    });
};

export const signInRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/api/signin`)
    .withCredentials()
    .auth(user.username, user.password)
    .then( res => {
      dispatch(signIn(res.text));
      if(process.env.NODE_ENV === 'production') {
        try {
          util.createCookie('Bracket-Busters-Token', res.text.token, 30);
        } catch (err) {
          console.error(err);
        }
      }
      else {
        localStorage.token = res.text;
      }
      return res;
    });
};

export const tokenSignInRequest = token => dispatch => {
  return superagent.get(`${__API_URL__}/api/signin/token`)
    .set('Authorization', `Bearer ${token}`)
    .then( res => {
      dispatch(signIn(res.text));
      if(process.env.NODE_ENV === 'production') {
        try {
          util.createCookie('Bracket-Busters-Token', res.text.token, 30);
        } catch (err) {
          console.error(err);
        }
      }
      else {
        localStorage.token = res.text;
      }
      return res;
    });
};