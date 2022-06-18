import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

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
import { userValidation, logError, renderIf } from './../../lib/util.js';
import './../../style/main.scss';

function LandingContainer(props) {
  let navigate = useNavigate();
  const [profileFormDisplay, setProfileFormDisplay] = useState(true);
  const [leagueFormDisplay, setLeagueFormDisplay] = useState(false);
  const [groupFormDisplay, setGroupFormDisplay] = useState(false);

  useEffect(() => {
    userValidation(props, navigate, false);
    props.sportingEventsFetch()
    .catch(err => logError(err));
    console.log('If you have any questions about my code please email me @BrianBixby0@gmail.com and visit https://www.builtbybixby.us to see my latest projects.');
  }, []);

  const handleLeagueCreate = league => {
    league.sportingEventID = props.sportingEvent._id;
    return props.leagueCreate(league)
      .then(myLeague => props.messageBoardLeagueFetch(myLeague.body._id))
      .then(messageBoard => {
        props.commentsFetch(messageBoard.comments);
        return messageBoard.leagueID
      })
      .then(leagueID => props.history.push(`/league/${leagueID}`))
      .catch(logError);
  };
  const handleGroupCreate = groupInput => {
    let group;
    return props.groupCreate(groupInput)
      .then(myGroup => {
        group = myGroup.body;
        return props.messageBoardGroupFetch(myGroup.body._id);
      })
      .then(messageBoard => props.commentsFetch(messageBoard.comments))
      .then(() => props.groupProfilesFetch(group.users))
      .then(groupID => props.history.push(`/group/${group._id}`))
      .catch(logError);
  };
  const handleProfileUpdate = profile => {
    return props.userProfileUpdate(profile)
      .catch(logError);
  };
  const onLeagueClick = (league, e) => {
    props.leagueFetchRequest(league);
    return props.messageBoardLeagueFetch(league._id)
      .then(messageBoard => {
        props.commentsFetch(messageBoard.comments);
      })
      .then(()=> props.userPicksFetch(league._id))
      .then( () =>  props.history.push(`/league/${league._id}`))
      .catch(logError);
  };
  const onGroupClick = (group, e) => {
    props.groupFetchRequest(group)
    return props.groupProfilesFetch(group.users)
      .then(() => props.messageBoardGroupFetch(group._id))
      .then(messageBoard => {
        props.commentsFetch(messageBoard.comments);
      })
      .then(() =>  props.history.push(`/group/${group._id}`))
      .catch(logError);
  };
  const handleBoundTopPublicLeagueClick = (league, e) => {
    if (props.leagues.some(leagues => leagues._id === league._id)) {
      onLeagueClick(league);
    }
    else {
      return props.leagueJoin(league._id)
      .then(() => props.messageBoardLeagueFetch(league._id))
      .then(messageBoard => props.commentsFetch(messageBoard.comments))
      .then(() => props.history.push(`/league/${league._id}`))
      .catch(logError);
    }
  };
  const handleBoundTopPublicGroupClick = (group, e) => {
    if (props.groups.some(groups => groups._id === group._id)) {
      onGroupClick(group);
    }
    else {
      return props.groupProfilesFetch(group.users)
        .then(() => props.groupJoin(group._id))
        .then(() => props.messageBoardGroupFetch(group._id))
        .then(messageBoard => props.commentsFetch(messageBoard.comments))
        .then(() => props.history.push(`/group/${group._id}`))
        .catch(logError);
    }
  };
  const handleRedirect = link => props.history.push(link);
    // let { params } = props.match;
    // let handleComplete = params.userAuth === 'signin' ? handleSignin : handleSignup;
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores';
    let profileAction ='create';
    let basketball = require('./../helpers/assets/basketball.png');
    let users = require('./../helpers/assets/icons/users.icon.svg');
    // let slide = require('./../helpers/assets/3.png');
    return (
      <section className='landing-page page-outer-div'>
        {renderIf(!props.userAuth,
          <Intro />
        )}
        {renderIf(props.userAuth,
          <div className='grid-container'>
            <BannerAd/>
            <div>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='createOuter'>
                    <CreateSection formType={formTypeLeague} joinedItems={props.leagues} handleRedirect={handleRedirect} handlejoinedItemClick={onLeagueClick}  handleCreate={() => setLeagueFormDisplay(true)}/>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='leagueBoardsContainer'>
                    <div className='leaguesContainerHeader'>
                      <img className='leaguesBoardIcon' src={basketball} alt="Basketball icon" />
                      <p className='leaguesBoardHeader'>LEAGUES</p>
                    </div>
                  <div className='tablesContainer'>
                    {renderIf(props.topPublicLeagues.length > 0,
                      <div className='container tableContainer leagueBoards'>
                        <div>
                          <p className='tableHeadline'>FEATURED LEAGUES</p>
                          <div className='tableColumnDiv'>
                            <p className='tableColumn columnName'> LEAGUE NAME </p>
                            <p className='tableColumn columnCreator'> CREATOR </p>
                            <p className='tableColumn columnSize'> SIZE </p>
                          </div>
                        </div>
                        {props.topPublicLeagues.map(topPublicLeague => {
                          let boundTopPublicLeagueClick = handleBoundTopPublicLeagueClick.bind(this, topPublicLeague);
                          return <div className='rowColors cursor' key={topPublicLeague._id} onClick={boundTopPublicLeagueClick}>
                            <Table item={topPublicLeague} type={formTypeLeague} />
                          </div>
                        })}
                        <div className='spacerRow'></div>
                      </div>
                    )}
                    {renderIf(props.topScores.length > 0,
                      <div className='container tableContainer leagueBoards'>
                        <div>
                          <p className='tableHeadline'>LEADERBOARD</p>
                          <div className='tableColumnDiv'>
                            <p className='tableColumn columnUser'> USER NAME </p>
                            <p className='tableColumn columnScore'> SCORE </p>
                          </div>
                        </div>
                        {props.topScores.map(topScore => {
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
              <div className={props.leagues.length < 1 ? 'marginTopLarge col-md-8' : 'col-md-8'}>
                <div className='createOuter'>
                  <CreateSection formType={formTypeGroup} joinedItems={props.groups} handleRedirect={handleRedirect} handlejoinedItemClick={onGroupClick}  handleCreate={() => setGroupFormDisplay(true)}/>
                </div>
              </div>
              <div className={props.leagues.length > 0 ? 'marginTopL57 col-md-4' : 'col-md-4'}>
                <div className='leagueBoardsContainer'>
                  <div className='leaguesContainerHeader'>
                    <img className='users' src={users} alt="users icon" />
                    <p className='leaguesBoardHeader'>FEATURED GROUPS</p>
                  </div>
                  {renderIf(props.topPublicGroups.length > 0,
                    <div className='container tableContainer'>
                      <div>
                        <p className='tableHeadline hideMed'>FEATURED GROUPS</p>
                        <div className='tableColumnDiv groupTableColumnDiv'>
                          <p className='tableColumn columnName'> GROUP NAME </p>
                          <p className='tableColumn columnCreator'> CREATOR </p>
                          <p className='tableColumn columnSize'> SIZE </p>
                        </div>
                      </div>
                      {props.topPublicGroups.map(topPublicGroup => {
                        let boundTopPublicGroupClick = handleBoundTopPublicGroupClick.bind(this, topPublicGroup);
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
              {renderIf(leagueFormDisplay,
                <Modal heading='Create League' close={() => setLeagueFormDisplay(false)}>
                  <LeagueForm 
                    onComplete={handleLeagueCreate} 
                  />
                </Modal>
              )}
              {renderIf(groupFormDisplay,
                <Modal heading='Create Group' close={() => setGroupFormDisplay(false)}>
                  <GroupForm onComplete={handleGroupCreate} />
                </Modal>
              )}
              {renderIf(profileFormDisplay && props.userProfile && props.userProfile.lastLogin === props.userProfile.createdOn,
                <Modal heading='Create Profile' close={() => { setProfileFormDisplay(false); handleProfileUpdate(props.userProfile); }}>
                  <ProfileForm userProfile={props.userProfile} onComplete={handleProfileUpdate} profileAction={profileAction} />
                </Modal>
              )}
            </div>
            {renderIf(props.groups.length > 0,
              <div className='spacer'></div>
            )}
          </div>
        )}
      </section>
    );
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