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

export const userValidation = async (props, navigate, redirect=true) => {
    try {
        if (props.userAuth) {
            await props.sportingEventsFetch()
        } else {
            const token = JSON.parse(localStorage.getItem("token"));
            if (token) {
                await props.tokenSignIn(token)
                const sportingEvent = await props.sportingEventsFetch();
                let profile = await props.userProfileFetch();
                let returnObj = {sportingEventID: sportingEvent._id, leagues: profile.body.leagues, groups: profile.body.groups};
                if (returnObj.leagues.length) {
                    await props.leaguesFetch(returnObj.leagues)
                }
                if (returnObj.groups.length) {
                    await props.groupsFetch(returnObj.groups)
                }
                if (!returnObj.leagues) {
                    returnObj.leagues = [];
                }
                await props.topPublicLeaguesFetch(returnObj.sportingEventID, returnObj.leagues)
                await props.topScoresFetch(returnObj.sportingEventID)
                if(!returnObj.groups) 
                    returnObj.groups = [];
                await props.topPublicGroupsFetch(returnObj.groups)
            } else {
                const event = await props.sportingEventsFetch()
                if (redirect) {
                    navigate("/");
                }
                return event;
            }
        }
    } catch (err) {
        return redirect ? navigate("/") : true;
    }
}