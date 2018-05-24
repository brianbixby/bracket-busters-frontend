export default (state={}, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'GROUPPROFILES_FETCH':
      console.log('groupProfiles reducer hit: ', payload);
      return payload;
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};