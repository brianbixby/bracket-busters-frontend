let validateUserProfile = userProfile => {
  if(!userProfile.userID || !userProfile.username){
    throw  new Error('VALIDATION ERROR: user profile requires a photo or bio');
  }
};

let userProfile = (state=null, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'USERPROFILE_CREATE':
      validateUserProfile(payload);
      return payload;
    case 'USERPROFILE_UPDATE':
      if(!state) throw new Error('USAGE ERROR: can not update when user profile is null');
      validateUserProfile(payload);
      return {...state, ...payload};
    case 'USERPROFILE_FETCH':
      return payload;
    case 'LEAGUE_JOIN':
      state.leagues.push(payload._id);
      return state;
    case 'GROUP_JOIN':
      state.groups.push(payload._id);
      return state;
    case 'SIGN_OUT':
      return null;
    default:
      return state;
  }
};

export default userProfile;