let groupProfiles = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'GROUPPROFILES_FETCH':
      return payload;
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default groupProfiles;