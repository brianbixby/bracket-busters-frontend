import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Intro from '../intro';
import LeagueForm from '../league-form';
import GroupForm from '../group-form';
import ProfileForm from '../profile-form';
import Modal from '../helpers/modal';
import CreateSection from '../helpers/createSection';
import JoinSection from '../helpers/joinSection';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueCreateRequest, leagueFetch } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupCreateRequest, groupFetch } from '../../actions/group-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import * as util from './../../lib/util.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { profileFormDisplay: true, leagueFormDisplay: false, groupFormDisplay: false }
  }

  componentWillMount() {
    util.userValidation(this.props);
  }

  handleLeagueCreate = league => {
    league.sportingEventID='5ad2a2bffb35c1479596fdc2';
    return this.props.leagueCreate(league)
      .then(myLeague => this.props.messageBoardLeagueFetch(myLeague.body._id))
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
        return messageBoard.leagueID
      })
      .then(leagueID => this.props.history.push(`/league/${leagueID}`))
      .catch(util.logError);
  }

  handleGroupCreate = group => {
    return this.props.groupCreate(group)
      .then(myGroup => this.props.messageBoardGroupFetch(myGroup.body._id))
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
        return messageBoard.groupID
      })
      .then(groupID => this.props.history.push(`/group/${groupID}`))
      .catch(util.logError);
  }

  handleProfileUpdate = profile => {
    return this.props.userProfileUpdate(profile)
      .catch(util.logError);
  }

  onLeagueClick = (league, e) => {
    this.props.leagueFetchRequest(league);
    return this.props.messageBoardLeagueFetch(league._id)
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
      })
      .then( () =>  this.props.history.push(`/league/${league._id}`))
      .catch(util.logError);
  }

  onGroupClick = (group, e) => {
    this.props.groupFetchRequest(group);
    return this.props.messageBoardGroupFetch(group._id)
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
      })
      .then( () =>  this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  }

  render() {
    let { params } = this.props.match;
    let handleComplete = params.userAuth === 'signin' ? this.handleSignin : this.handleSignup;
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let russ = require('./../helpers/assets/russ.png');
    let kd = require('./../helpers/assets/kd.png');
    return (
      <section className='landing-page page-outer-div'>
        
        {util.renderIf(!this.props.userAuth,
          <Intro />
        )}

      <div className='grid-container'>
        {util.renderIf(this.props.userAuth,
          <div>
            <CreateSection formType={formTypeLeague} handleCreate={() => this.setState({ leagueFormDisplay: true })}/>

            {util.renderIf(this.props.leagues,
              <div >
                {util.renderIf(this.props.leagues.length > 0,
                <div>
                  <p className='header usersLeagueAndGroupsHeader myLeaguesList'>my leagues</p>
                <div className='myleaguesHeader'>
                  <p className='l-name myL-headers'> LEAGUE NAME </p>
                  <p className='l-creator myL-headers'> CREATOR </p>
                  <p className='l-players myL-headers'> PLAYERS </p>
                  <p className='l-scoring myL-headers'> SCORING </p>
                </div>
                </div>
                )}
                {util.renderIf(this.props.leagues.length < 1,
                  <JoinSection joinType={formTypeLeague}/>
                )}
                {this.props.leagues.map(league => {
                  let boundLeagueClick = this.onLeagueClick.bind(this, league);
                  return <div key={league._id} className='rowColors'>
                    <div className='span-row' onClick={boundLeagueClick}>
                      <p className='span-name'>{league.leagueName} </p>
                      <p className='span-owner'>{league.ownerName} </p>
                      <p className='span-size'>{league.size} </p>
                      <p className='span-scoring'>{league.scoring} </p>
                    </div>
                  </div>
                })}
                {util.renderIf(this.props.leagues.length > 0,
                  <div className='spacerRow'> </div>
                )}
              </div>
            )}
            
            {util.renderIf(this.props.leagues.length > 0,
              <JoinSection joinType={formTypeLeague} alreadyJoined={this.props.leagues.length}/>
            )}
            
            {util.renderIf(this.state.leagueFormDisplay,
              <Modal heading='Create League' close={() => this.setState({ leagueFormDisplay: false })}>
                <LeagueForm 
                  onComplete={this.handleLeagueCreate} 
                />
              </Modal>
            )}

            <CreateSection formType={formTypeGroup} handleCreate={() => this.setState({ groupFormDisplay: true })}/>
            {util.renderIf(this.props.groups,

              <div >
                
                {util.renderIf(this.props.groups.length > 0,
                <div>
                <p className='header usersLeagueAndGroupsHeader'>my groups</p>
                <div className='myleaguesHeader'>
                  <p className='l-name myL-headers'> LEAGUE NAME </p>
                  <p className='l-creator myL-headers'> CREATOR </p>
                  <p className='l-players myL-headers'> SIZE </p>
                  <p className='l-scoring myL-headers'> PRIVACY </p>
                </div>
                </div>
                )}
                {util.renderIf(this.props.groups.length < 1,
                  <JoinSection joinType={formTypeGroup}/>
                )}
                {this.props.groups.map(group => {
                  let boundGroupClick = this.onGroupClick.bind(this, group);
                  return <div className='rowColors' key={group._id}>
                    <p onClick={boundGroupClick} className='span-row'>
                      <span className='span-name'>{group.groupName} </span>
                      <span className='span-owner'>{group.ownerName} </span>
                      <span className='span-size'>{group.size} </span>
                      <span className='span-privacy'>{group.privacy} </span>
                    </p>
                  </div>
                })}
                {util.renderIf(this.props.groups.length > 0,
                <div className='spacerRow'> </div>
                )}
              </div>
            )}

            {util.renderIf(this.props.groups.length > 0,
              <JoinSection joinType={formTypeGroup} joinedAlready={this.props.groups.length}/>
            )}

            {util.renderIf(this.state.groupFormDisplay,
              <Modal heading='Create Group' close={() => this.setState({ groupFormDisplay: false })}>
                <GroupForm 
                  onComplete={this.handleGroupCreate} 
                />
              </Modal>
            )}

            {util.renderIf(this.state.profileFormDisplay && this.props.userProfile && this.props.userProfile.lastLogin === this.props.userProfile.createdOn,
              <Modal heading='Fill Out Your Profile'
                close={() => {
                  this.setState({ profileFormDisplay: false });
                  this.handleProfileUpdate(this.props.userProfile);
                }}>

                <ProfileForm 
                  userProfile={this.props.userProfile} 
                  onComplete={this.handleProfileUpdate}
                />

              </Modal>
            )}
          </div>
        )}
         {util.renderIf(this.props.groups.length > 0,
          <div className='spacer'></div>
         )}
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
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
  leagueCreate: league => dispatch(leagueCreateRequest(league)),
  groupCreate: group => dispatch(groupCreateRequest(group)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  groupFetchRequest: group => dispatch(groupFetch(group)),
  messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
  messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);