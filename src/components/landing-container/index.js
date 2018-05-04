import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Intro from '../intro';
import LeagueForm from '../league-form';
import GroupForm from '../group-form';
import ProfileForm from '../profile-form';
import Modal from '../helpers/modal';
import CreateSection from '../helpers/createSection';
import NewCreateSection from '../helpers/newCreate';
import JoinSection from '../helpers/joinSection';
import NewJoinSection from '../helpers/newJoin';
import Slider from '../helpers/slider';
import Table from '../helpers/table';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueCreateRequest, leagueFetch, leagueJoinRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupCreateRequest, groupFetch, topPublicGroupsFetchRequest, groupJoinRequest } from '../../actions/group-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import * as util from './../../lib/util.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { profileFormDisplay: true, leagueFormDisplay: false, groupFormDisplay: false }
  }

  componentWillMount() {
    util.userValidation(this.props);
  }
  componentDidMount() {
    this.props.sportingEventsFetch()
      .catch(err => util.logError(err));
  }

  handleLeagueCreate = league => {
    league.sportingEventID = this.props.sportingEvent._id;
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
      .then(() =>  this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  }

  handleBoundTopPublicLeagueClick = (league, e) => {
    return this.props.leagueJoin(league._id)
      .then(() => this.props.messageBoardLeagueFetch(league._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/league/${league._id}`))
      .catch(util.logError);
  };

  handleBoundTopPublicGroupClick = (group, e) => {
    return this.props.groupJoin(group._id)
      .then(() => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  };

  handleRedirect = link => this.props.history.push(link);

  render() {
    let { params } = this.props.match;
    let handleComplete = params.userAuth === 'signin' ? this.handleSignin : this.handleSignup;
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores'
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
              <div className='row'>
                <div className='col-lg-7'>
                  <NewCreateSection joinType={formTypeLeague} formType={formTypeLeague} joinedItems={this.props.leagues} handleRedirect={this.handleRedirect} handlejoinedItemClick={this.onLeagueClick}  handleCreate={() => this.setState({ leagueFormDisplay: true })}/>
                </div>
                <div className='col-lg-5'>
                  {util.renderIf(this.props.topPublicLeagues.length > 0,
                    <div className='container'>
                      <div>
                        <p className='tableHeadline'>FEATURED LEAGUES</p>
                        <div className='tableColumnDiv'>
                          <p className='tableColumn columnName'> LEAGUE NAME </p>
                          <p className='tableColumn columnCreator'> CREATOR </p>
                          <p className='tableColumn columnSize'> SIZE </p>
                        </div>
                      </div>
                      {this.props.topPublicLeagues.map(topPublicLeague => {
                        let boundTopPublicLeagueClick = this.handleBoundTopPublicLeagueClick.bind(this, topPublicLeague);
                        return <div className='rowColors cursor' key={topPublicLeague._id} onClick={boundTopPublicLeagueClick}>
                          <Table item={topPublicLeague} type={formTypeLeague} />
                        </div>
                      })}
                      <div className='spacerRow'></div>
                    </div>
                  )}
                  {util.renderIf(this.props.topScores.length > 0,
                    <div className='container'>
                      <div>
                        <p className='tableHeadline'>LEADERBOARD</p>
                        <div className='tableColumnDiv'>
                          <p className='tableColumn columnUser'> USER NAME </p>
                          <p className='tableColumn columnScore'> SCORE </p>
                        </div>
                      </div>
                      {this.props.topScores.map(topScore => {
                        return <div className='rowColors' key={topScore._id}>
                          <Table item={topScore} type={topScores} />
                        </div>
                      })}
                      <div className='spacerRow'> </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-7'>
                  <NewCreateSection joinType={formTypeGroup} formType={formTypeGroup} joinedItems={this.props.groups} handleRedirect={this.handleRedirect} handlejoinedItemClick={this.onGroupClick}  handleCreate={() => this.setState({ groupFormDisplay: true })}/>
                </div>
                {util.renderIf(this.props.topPublicGroups.length > 0,
                  <div className='col-lg-5'>
                    <div className='container'>
                      <div>
                        <p className='tableHeadline'>FEATURED GROUPS</p>
                        <div className='tableColumnDiv'>
                          <p className='tableColumn columnName'> GROUP NAME </p>
                          <p className='tableColumn columnCreator'> CREATOR </p>
                          <p className='tableColumn columnSize'> SIZE </p>
                        </div>
                      </div>
                      {this.props.topPublicGroups.map(topPublicGroup => {
                        let boundTopPublicGroupClick = this.handleBoundTopPublicGroupClick.bind(this, topPublicGroup);
                        return <div className='rowColors cursor' key={topPublicGroup._id} onClick={boundTopPublicGroupClick}>
                          <Table item={topPublicGroup} type={formTypeGroup} />
                        </div>
                      })}
                      <div className='spacerRow'></div>
                    </div>
                  </div>
                )}
              </div>
              {util.renderIf(this.state.leagueFormDisplay,
                <Modal heading='Create League' close={() => this.setState({ leagueFormDisplay: false })}>
                  <LeagueForm 
                    onComplete={this.handleLeagueCreate} 
                  />
                </Modal>
              )}
              {util.renderIf(this.state.groupFormDisplay,
                <Modal heading='Create Group' close={() => this.setState({ groupFormDisplay: false })}>
                  <GroupForm onComplete={this.handleGroupCreate} />
                </Modal>
              )}
              {util.renderIf(this.state.profileFormDisplay && this.props.userProfile && this.props.userProfile.lastLogin === this.props.userProfile.createdOn,
                <Modal heading='Fill Out Your Profile' close={() => { this.setState({ profileFormDisplay: false }); this.handleProfileUpdate(this.props.userProfile); }}>
                  <ProfileForm userProfile={this.props.userProfile} onComplete={this.handleProfileUpdate} />
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
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  leagueCreate: league => dispatch(leagueCreateRequest(league)),
  groupCreate: group => dispatch(groupCreateRequest(group)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  groupFetchRequest: group => dispatch(groupFetch(group)),
  leagueJoin: leagueID => dispatch(leagueJoinRequest(leagueID)),
  groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
  messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
  messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);