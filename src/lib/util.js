import { asyncComponent } from 'react-async-component';

export const log = (...args) => console.log(...args);
export const logError = (...args) => console.error(...args);
export const renderIf = (test, component) => test ? component : undefined;
export const classToggler = (options) => Object.keys(options).filter(key => !!options[key]).join(' ');

export const checkAndAdd = (payload, state) => {
  var found = state.some(function (el) {
    return el._id === payload._id;
  });
  if (!found) state.push(payload);
  return state;
};

export const formatDate = date => {
  let dateArr = new Date(date).toDateString().split(' ');
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};

export const userValidation = props => {
  if(!props.userAuth) {
    let { history } = props;
    
    let token = localStorage.token;  
    if(token) {
      return props.tokenSignIn(token)
        .then(() => {
          return props.sportingEventsFetch()
            .catch(() => logError);
        })
        .then(sportingEvent => {
          return props.userProfileFetch()
            .then(profile => {
              return {sportingEventID: sportingEvent._id, leagues: profile.body.leagues, groups: profile.body.groups};
            })
            .catch(() => logError);
        })
        .then(returnObj => {
          if(returnObj.leagues.length)
            props.leaguesFetch(returnObj.leagues)
              .catch(() => logError);
          return returnObj;
        })
        .then(returnObj => {
          if(returnObj.groups.length)
            props.groupsFetch(returnObj.groups)
              .catch(() => logError);
          return returnObj;
        })
        .then(returnObj => {
          if(!returnObj.leagues) 
            returnObj.leagues = [];
          return props.topPublicLeaguesFetch(returnObj.sportingEventID, returnObj.leagues)
            .then(() => returnObj)
            .catch(() => logError);
        })
        .then(returnObj => {
          return props.topScoresFetch(returnObj.sportingEventID)
            .then(() => returnObj)
            .catch(() => logError);
        })
        .then(returnObj => {
          if(!returnObj.groups) 
            returnObj.groups = [];
          return props.topPublicGroupsFetch(returnObj.groups)
            .catch(() => logError);
        })
        .catch(() => {
          logError;
          if(props.location.pathname !== '/')
            return history.replace('/');
          return;
        });
    } else {
      return props.sportingEventsFetch()
        .then((event) => {
          if(props.location.pathname !== '/')
            history.replace('/');
          return event;
        })
        .catch(() => logError);
    }
  }
  return props.sportingEventsFetch()
    .catch(() => logError);
};

export const makeAsyncComponent = importStmt => {
  return asyncComponent({
    resolve: () => importStmt
  })
};