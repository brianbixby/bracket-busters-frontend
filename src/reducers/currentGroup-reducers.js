let currentGroup = (state={}, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'GROUP_FETCH':
      return payload;
    case 'GROUP_CREATE':
      return payload;
    case 'GROUP_JOIN':
      return payload;
    case 'GROUP_UPDATE':
      if(state === {}) throw new Error('USAGE ERROR: can not update group not in state, currentGroup reducer');
      return payload;
    case 'GROUP_DELETE':
      if(state === {}) throw new Error('USAGE ERROR: can not delete group not in state, currentGroup reducer');
      return {};
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentGroup;