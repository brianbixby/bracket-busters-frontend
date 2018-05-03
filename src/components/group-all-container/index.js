import React from 'react';
import { connect } from 'react-redux';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, allPublicGroupsFetchRequest, groupJoinRequest, privateGroupJoinRequest, groupFetch, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import GroupAllPrivateForm from '../group-all-private-form';
import * as util from './../../lib/util.js';

class GroupAllContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    util.userValidation(this.props);
    this.props.allPublicGroupsFetch();
  }

  handleGroupJoin = (group, e) => {
    return this.props.groupJoin(group._id)
      .then(() => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  };

  handlePrivateGroupJoin = credentials => {
    return this.props.privateGroupJoin(credentials)
      .then(group => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
        return messageBoard.groupID
      })
      .then(groupID => this.props.history.push(`/group/${groupID}`))
      .catch(util.logError);
  };

  render() {
    return (
      <section className='groups-container page-outer-div'>
        <div className='grid-container'>

        <GroupAllPrivateForm onComplete={this.handlePrivateGroupJoin}/>
        
        <div className='public-groups'>
          <h2>public groups.</h2>
          {this.props.publicGroups.map(group => {
            let boundGroupJoinClick = this.handleGroupJoin.bind(this, group);
            return <div key={group._id}>
              <p className='span-row'>
                <span className='span-name'>{group.groupName} </span>
                <span className='span-owner'>{group.ownerName} </span>
                <span className='span-size'>{group.size} </span>
                <span className='span-scoring'>{group.scoring}</span>
                <span className='span-join'><button className='button' onClick={boundGroupJoinClick}>join</button></span>
              </p>
            </div>
          })}
        </div>

      </div>
      </section>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  leagues: state.leagues,
  groups: state.groups,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  publicGroups: state.publicGroups,
});

let mapDispatchToProps = dispatch => {
  return {
    tokenSignIn: token => dispatch(tokenSignInRequest(token)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
    leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
    groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
    sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
    topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
    topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
    topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
    allPublicGroupsFetch: () => dispatch(allPublicGroupsFetchRequest()),
    groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
    privateGroupJoin: credentials => dispatch(privateGroupJoinRequest(credentials)),
    groupFetchRequest: group => dispatch(groupFetch(group)),
    messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
    commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAllContainer);