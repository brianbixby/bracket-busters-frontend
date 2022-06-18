let validateSportingEvent = sportingEvent => {
    console.log("sportingEvent: ", sportingEvent)
  if(!sportingEvent._id || !sportingEvent.sportingEventName || !sportingEvent.desc || !sportingEvent.createdON) {
    throw new Error('VALIDATION ERROR: sportingEvent requires a id, name, desc and createdOn.');
  }
};

let sportingEvent = (state=null, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'SPORTINGEVENTS_FETCH':
      return payload;
    case 'SPORTINGEVENT_CREATE':
      validateSportingEvent(payload);
      return payload;
    case 'SIGN_OUT':
      return null;
    default:
      return state;
  }
};

export default sportingEvent;