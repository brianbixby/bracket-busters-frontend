import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, groupProfilesFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueFetchRequest, leagueUpdateRequest, topPublicLeaguesFetchRequest, leagueFetch, leagueJoinRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest, groupFetch, groupJoinRequest } from '../../actions/group-actions.js';
import { scoreBoardsFetchRequest, topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { gamesFetchRequest, gameUpdateRequest } from '../../actions/game-actions.js';
import { userPicksFetchRequest, userPickUpdateRequest, userPickCreateRequest, userPickFetchRequest, } from '../../actions/userPick-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import GameItem from '../game-item';
import UserPickItem from '../user-pick-item';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import { userValidation, logError, renderIf } from '../../lib/util.js';

function LeagueContainer(props) {
    let navigate = useNavigate();
    const [scoreBoardsShown, setScoreBoardsShown] = useState(10);

    useEffect(() => {
        return userValidation(props, navigate)
        .then(() => {
          if (Object.entries(props.currentLeague).length === 0) {
            return props.leagueFetch(window.location.href.split('/league/')[1])
              .then(league => props.messageBoardLeagueFetch(league._id))
              .then(mb => props.commentsFetch(mb.comments))
          }
          return ;
        })
        .then(() => props.scoreBoardsFetch(window.location.href.split('/league/')[1]))
        .then(() => props.userPicksFetch(window.location.href.split('/league/')[1]))
        .then(picks => {
          let gameIDArr = [];
          gameIDArr.push(picks.map(userPick => userPick.gameID._id));
          return props.gamesFetch(props.currentLeague.sportingEventID, gameIDArr)
        })
        .then(() => window.scrollTo(0, 0))
        .catch(() => logError);
    }, [])

  const formatDate = date => {
    let dateArr = new Date(date).toDateString().split(' ');
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
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
//   const handleComplete = league => {
//     return props.leagueUpdate(league)
//       .then(() => props.history.push(`/league/${props.league._id}`))
//       .catch(logError);
//   };
  const handleUpdate = userPick => {
    return props.userPickUpdate(userPick)
      .catch(console.error);
  };
  const handleCreate = userPick => {
    userPick.leagueID= props.currentLeague._id;
    return props.userPickCreate(userPick)
      .then(userPick => props.userPickFetch(userPick._id))
      .catch(console.error);
  };
  const handleShowAll = () => {
    scoreBoardsShown === 10
      ? setScoreBoardsShown(props.scoreBoards.length)
        : setScoreBoardsShown(10);
  };
    let currentLeague = props.currentLeague;
    // let scoreBoards = 'scores';
    let nbalogo = require('./../helpers/assets/nba-logo.png');
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores';
    let basketball = require('./../helpers/assets/basketball.png');
    let kd = require('./../helpers/assets/2.png');
    let leaguePhoto = currentLeague.image ? <img className='createImg' src={currentLeague.image} alt="current league" /> : <img className='createImg' src={kd} alt="league placeholder" />;
    let scores = props.scoreBoards.slice(0, scoreBoardsShown);
    let users = require('./../helpers/assets/icons/users.icon.svg');
    let info = require('./../helpers/assets/icons/info.icon.svg');
    return (
      <div className='leagueItem-page page-outer-div' id='top'>
        <div className='grid-container'>
          <BannerAd/>
          <div className='row'>
            <div className='col-md-8'>
              <div className='createOuter'>
                <div className='createOuterInner'>
                  <div className='outer'>
                    <div className='outerLeft'>
                      <img src={nbalogo} alt="NBA Logo" />
                      <p className='headerText'>NBA</p>
                    </div>
                    <div className='outerRight'>
                    </div>
                  </div>
                  <div className='createMain'>
                    <div className='createMainWrapper'>
                      <div className='createMainContent'>
                        <div className='createMainBorder'></div>
                        <div>
                          <p className='createMainTitle'>{currentLeague.leagueName}</p>
                          <p className='createMainSubtitle'>{currentLeague.motto}</p>
                        </div>
                      </div>
                      <div className='createImgDiv'>
                        {leaguePhoto}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='joinOuter'>
                  <div className='joinWrapper'>
                    <div className='joinTextDiv'>
                      <div>
                        <p className='joinTextTitle'>
                          League Info
                        </p>
                        <p className='joinTextSubtitle'>
                          Creator: {currentLeague.ownerName} <br></br>
                          Created: {formatDate(currentLeague.createdOn)} <br></br>
                          Privacy: {currentLeague.privacy} <br></br>
                          Size: {currentLeague.size}
                        </p>
                      </div>
                    </div>
                    <div className='joinImgDiv'>
                      <img className='info' src={info} alt="League info icon" />
                    </div>
                  </div>
                </div>
                {renderIf(props.games && props.games.length > 0,
                    <div className='mtop8'>
                      <div className='picksGamesHeader'>Games</div>
                      <div className='container overflow boxShadow'>
                        {props.games.map(game =>
                          <div key={game._id} className='gameItemOuter'>
                            <GameItem  game={game} onComplete={handleCreate}/>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {renderIf(props.userPicks && props.userPicks.length > 0,
                    <div className=' mtop8'>
                      <div className='picksGamesHeader'>Picks</div>
                        <div className='container overflow boxShadow'>
                          {props.userPicks.map((userPick, idx) =>
                            <div key={idx} className='maxHeight90 userPickItemOuter'>
                              <UserPickItem  userPick={userPick} onUpdate={handleUpdate}/>
                            </div>
                          )}
                        </div>
                    </div>
                  )}
              </div>
              <div className='m16'>
                <MessageBoardContainer mBoardId={props.currentMessageBoard._id} commentsArray={props.currentMessageBoard.comments}/>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='leagueBoardsContainer'>
                <div className='leaguesContainerHeader'>
                  <img className='leaguesBoardIcon' src={basketball} alt="Basketball icon"/>
                  <p className='leaguesBoardHeader'>LEAGUES</p>
                </div>
                <div className='tablesContainer'>
                  <div className='container tableContainer leagueBoards'>
                    <div>
                      <p className='tableHeadline'>{currentLeague.leagueName} SCOREBOARD</p>
                      <div className='tableColumnDiv'>
                        <p className='tableColumn columnUser'> USER NAME </p>
                        <p className='tableColumn columnScore'> SCORE </p>
                      </div>
                    </div>
                    {scores.map(score => {
                      return <div className='rowColors' key={score._id}>
                      <Table item={score} type={topScores} />
                      </div>
                    })}
                    <div className='spacerRow'>
                      {renderIf( props.scoreBoards.length >10,
                        <p className='seeAll' onClick={handleShowAll}> See All</p>
                      )}
                    </div>
                  </div>
                  <div>
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
                  </div>
                </div>
              </div>
              <div className='leagueBoardsContainer'>
                <div className='leaguesContainerHeader'>
                  <img className='users' src={users} alt="users icon" />
                  <p className='leaguesBoardHeader'>FEATURED GROUPS</p>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentLeague: state.currentLeague,
  currentMessageBoard: state.currentMessageBoard,
  scoreBoards: state.scoreBoards,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  games: state.games,
  userPicks: state.userPicks,
  leagues: state.leagues,
  groups: state.groups,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  leagueFetch: league => dispatch(leagueFetchRequest(league)),
  leagueUpdate: league => dispatch(leagueUpdateRequest(league)),
  scoreBoardsFetch: leagueID => dispatch(scoreBoardsFetchRequest(leagueID)),
  userPicksFetch: leagueID => dispatch(userPicksFetchRequest(leagueID)),
  userPickUpdate: userPick => dispatch(userPickUpdateRequest(userPick)),
  userPickCreate: userPick => dispatch(userPickCreateRequest(userPick)),
  userPickFetch: userPick => dispatch(userPickFetchRequest(userPick)),
  gamesFetch: (sportingEventID, gameIDArr) => dispatch(gamesFetchRequest(sportingEventID, gameIDArr)),
  gameUpdate: game => dispatch(gameUpdateRequest(game)),
  leagueJoin: leagueID => dispatch(leagueJoinRequest(leagueID)),
  groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
  messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
  messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  groupProfilesFetch : profileIDs => dispatch(groupProfilesFetchRequest(profileIDs)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  groupFetchRequest: group => dispatch(groupFetch(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);