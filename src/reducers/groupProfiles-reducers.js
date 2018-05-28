export default (state={}, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};