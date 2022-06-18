import { combineReducers } from 'redux';
import userAuth from './userAuth-reducers';
import userProfile from './userProfile-reducers';
import sportingEvent from './sportingEvent-reducers';
import leagues from './league-reducers';
import groups from './group-reducers';
import messageBoards from './messageBoard-reducers';
import comments from './comment-reducers';
import scoreBoards from './scoreBoard-reducers';
import games from './game-reducers';
import userPicks from './userPick-reducers';
import currentLeague from './currentLeague-reducers.js';
import currentGroup from './currentGroup-reducers.js';
import currentMessageBoard from './currentMessageBoard-reducers.js';
import publicLeagues from './allPublicLeagues-reducers.js';
import publicGroups from './allPublicGroups-reducers.js';
import topPublicLeagues from './topLeagues-reducers';
import topPublicGroups from './topGroups-reducers';
import topScores from './topScores-reducers';
import groupProfiles from './groupProfiles-reducers';

export default combineReducers({
  userAuth,
  userProfile,
  sportingEvent,
  leagues,
  groups,
  messageBoards,
  comments,
  scoreBoards,
  games,
  userPicks,
  currentLeague,
  currentGroup,
  currentMessageBoard,
  publicLeagues,
  publicGroups,
  topPublicLeagues,
  topPublicGroups,
  topScores,
  groupProfiles,
});