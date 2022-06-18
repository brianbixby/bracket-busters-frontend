import { checkAndAdd } from '../lib/util.js';

let validateGroup = group => {
  if(!group._id || !group.groupName || !group.size|| !group.createdOn || !group.owner || !group.privacy || !group.users) {
    throw new Error('VALIDATION ERROR: group requires a id, name, size, createdOn date, owner, privacy and users.');
  }
};

let group = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'GROUP_FETCH':
      return checkAndAdd(payload, state);
    case 'GROUPS_FETCH':
      return [...payload, ...state];
    case 'GROUP_CREATE':
      validateGroup(payload);
      return [payload, ...state];
    case 'GROUP_UPDATE':
      if(state === []) throw new Error('USAGE ERROR: can not update group not in state');
      validateGroup(payload);
      return state.map(group => group._id === payload._id ? payload : group);
    case 'GROUP_DELETE':
      if(state === []) throw new Error('USAGE ERROR: can not delete group not in state');
      validateGroup(payload);
      return state.filter(item => item._id !== payload._id);
    case 'GROUP_JOIN':
      return [payload, ...state];
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default group;