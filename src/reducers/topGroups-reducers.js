let topGroups = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'TOP_PUBLIC_GROUPS_FETCH':
      return payload;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default topGroups;