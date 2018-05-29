import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest, groupProfilesFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueCreateRequest, leagueFetch, leagueJoinRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupCreateRequest, groupFetch, topPublicGroupsFetchRequest, groupJoinRequest } from '../../actions/group-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { userPicksFetchRequest } from '../../actions/userPick-actions.js';
import Intro from '../intro';
import LeagueForm from '../league-form';
import GroupForm from '../group-form';
import ProfileForm from '../profile-form';
import Modal from '../helpers/modal';
import CreateSection from '../helpers/createSection';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import { userVaildation, logError, renderIf } from './../../lib/util.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { profileFormDisplay: true, leagueFormDisplay: false, groupFormDisplay: false }
  }

  componentWillMount() {
    userValidation(this.props);
  }
  componentDidMount() {
    this.props.sportingEventsFetch()
      .catch(err => logError(err));
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
      .catch(logError);
  };

  handleGroupCreate = groupInput => {
    let group;
    return this.props.groupCreate(groupInput)
      .then(myGroup => {
        group = myGroup.body;
        return this.props.messageBoardGroupFetch(myGroup.body._id);
      })
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.groupProfilesFetch(group.users))
      .then(groupID => this.props.history.push(`/group/${group._id}`))
      .catch(logError);
  };

  handleProfileUpdate = profile => {
    return this.props.userProfileUpdate(profile)
      .catch(logError);
  };

  onLeagueClick = (league, e) => {
    this.props.leagueFetchRequest(league);
    return this.props.messageBoardLeagueFetch(league._id)
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
      })
      .then(()=> this.props.userPicksFetch(league._id))
      .then( () =>  this.props.history.push(`/league/${league._id}`))
      .catch(logError);
  };

  onGroupClick = (group, e) => {
    this.props.groupFetchRequest(group)
    return this.props.groupProfilesFetch(group.users)
      .then(() => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
      })
      .then(() =>  this.props.history.push(`/group/${group._id}`))
      .catch(logError);
  };

  handleBoundTopPublicLeagueClick = (league, e) => {
    if (this.props.leagues.some(leagues => leagues._id === league._id)) {
      this.onLeagueClick(league);
    }
    else {
      return this.props.leagueJoin(league._id)
      .then(() => this.props.messageBoardLeagueFetch(league._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/league/${league._id}`))
      .catch(logError);
    }
  };

  handleBoundTopPublicGroupClick = (group, e) => {
    if (this.props.groups.some(groups => groups._id === group._id)) {
      this.onGroupClick(group);
    }
    else {
      return this.props.groupProfilesFetch(group.users)
        .then(() => this.props.groupJoin(group._id))
        .then(() => this.props.messageBoardGroupFetch(group._id))
        .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
        .then(() => this.props.history.push(`/group/${group._id}`))
        .catch(logError);
    }
  };

  handleRedirect = link => this.props.history.push(link);

  render() {
    let { params } = this.props.match;
    let handleComplete = params.userAuth === 'signin' ? this.handleSignin : this.handleSignup;
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores';
    let profileAction ='create';
    let basketball = require('./../helpers/assets/basketball.png');

    return (
      <section className='landing-page page-outer-div'>
        {renderIf(!this.props.userAuth,
          <Intro />
        )}
        
        {renderIf(this.props.userAuth,
          <div className='grid-container'>
           <BannerAd/>
            <div>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='createOuter'>
                    <CreateSection formType={formTypeLeague} joinedItems={this.props.leagues} handleRedirect={this.handleRedirect} handlejoinedItemClick={this.onLeagueClick}  handleCreate={() => this.setState({ leagueFormDisplay: true })}/>
                  </div>
                  </div>
                  <div className='col-md-4'>
                  <div className='leagueBoardsContainer'>
                  <div className='leaguesContainerHeader'>
                    <img className='leaguesBoardIcon' src={basketball} />
                    <p className='leaguesBoardHeader'>LEAGUES</p>
                  </div>
                  <div className='tablesContainer'>
                  {renderIf(this.props.topPublicLeagues.length > 0,
                    <div className='container tableContainer leagueBoards'>
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
                  {renderIf(this.props.topScores.length > 0,
                    <div className='container tableContainer leagueBoards'>
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
                  </div>
                  <div className={this.props.leagues.length < 1 ? 'marginTopLarge col-md-8' : 'col-md-8'}>
                  <div className='createOuter'>
                    <CreateSection formType={formTypeGroup} joinedItems={this.props.groups} handleRedirect={this.handleRedirect} handlejoinedItemClick={this.onGroupClick}  handleCreate={() => this.setState({ groupFormDisplay: true })}/>
                  </div>
                </div>
                <div className={this.props.leagues.length > 0 ? 'marginTopL57 col-md-4' : 'col-md-4'}>
                <div className='leagueBoardsContainer'>
                  <div className='leaguesContainerHeader'>
                    <i className="fa fa-users"></i>
                    <p className='leaguesBoardHeader'>FEATURED GROUPS</p>
                  </div>
                  {renderIf(this.props.topPublicGroups.length > 0,
                    <div className='container tableContainer'>
                      <div>
                        <p className='tableHeadline hideMed'>FEATURED GROUPS</p>
                        <div className='tableColumnDiv groupTableColumnDiv'>
                          <p className='tableColumn columnName'> GROUP NAME </p>
                          <p className='tableColumn columnCreator'> CREATOR </p>
                          <p className='tableColumn columnSize'> SIZE </p>
                        </div>
                      </div>
                      {this.props.topPublicGroups.map(topPublicGroup => {
                        let boundTopPublicGroupClick = this.handleBoundTopPublicGroupClick.bind(this, topPublicGroup);
                        return <div className='rowColors cursor groupsTableContainer' key={topPublicGroup._id} onClick={boundTopPublicGroupClick}>
                          <Table item={topPublicGroup} type={formTypeGroup} />
                        </div>
                      })}
                      <div className='spacerRow'></div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
              {renderIf(this.state.leagueFormDisplay,
                <Modal heading='Create League' close={() => this.setState({ leagueFormDisplay: false })}>
                  <LeagueForm 
                    onComplete={this.handleLeagueCreate} 
                  />
                </Modal>
              )}
              {renderIf(this.state.groupFormDisplay,
                <Modal heading='Create Group' close={() => this.setState({ groupFormDisplay: false })}>
                  <GroupForm onComplete={this.handleGroupCreate} />
                </Modal>
              )}
              {renderIf(this.state.profileFormDisplay && this.props.userProfile && this.props.userProfile.lastLogin === this.props.userProfile.createdOn,
                <Modal heading='Create Profile' close={() => { this.setState({ profileFormDisplay: false }); this.handleProfileUpdate(this.props.userProfile); }}>
                  <ProfileForm userProfile={this.props.userProfile} onComplete={this.handleProfileUpdate} profileAction={profileAction} />
                </Modal>
              )}
            </div>
          
            {renderIf(this.props.groups.length > 0,
              <div className='spacer'></div>
            )}
          </div>
        )}
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
  games: state.games,
  userPicks: state.userPicks,
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
  userPicksFetch: leagueID => dispatch(userPicksFetchRequest(leagueID)),
  groupProfilesFetch : profileIDs => dispatch(groupProfilesFetchRequest(profileIDs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);