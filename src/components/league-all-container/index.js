import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, allPublicLeaguesFetchRequest, leagueJoinRequest, privateLeagueJoinRequest, leagueFetch, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { messageBoardLeagueFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { userPicksFetchRequest } from '../../actions/userPick-actions.js';
import LeagueAllPrivateForm from '../league-all-private-form';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import { userValidation, logError} from '../../lib/util.js';

function LeagueAllContainer(props) {
    let navigate = useNavigate();
    const [leaguesShown, setLeaguesShown] = useState(10);

    useEffect(() => {
        return userValidation(props, navigate)
        .then(() => props.allPublicLeaguesFetch())
        .catch(() => logError);
    }, [])

  const onLeagueClick = (league, e) => {
    props.leagueFetchRequest(league);
    return props.messageBoardLeagueFetch(league._id)
      .then(messageBoard => {
        props.commentsFetch(messageBoard.comments);
      })
      .then(()=> props.userPicksFetch(league._id))
      .then( () =>  navigate(`/league/${league._id}`))
      .catch(logError);
  };
  const handleLeagueJoin = (league, e) => {
    if (props.leagues.some(leagues => leagues._id === league._id)) {
      onLeagueClick(league);
    }
    else {
      return props.leagueJoin(league._id)
      .then(() => props.messageBoardLeagueFetch(league._id))
      .then(messageBoard => props.commentsFetch(messageBoard.comments))
      .then(() => navigate(`/league/${league._id}`))
      .catch(logError);
    }
  };
  const handlePrivateLeagueJoin = credentials => {
    let league;
    if (props.leagues.some(leagues => {
      if(leagues.leagueName === credentials.leagueName) {
        return league = leagues;
      } else {
        return ;
      }
    }
    )) {
      onLeagueClick(league);
    }
    else {
      return props.privateLeagueJoin(credentials)
        .then(league => props.messageBoardLeagueFetch(league._id))
        .then(messageBoard => {
          props.commentsFetch(messageBoard.comments);
          return messageBoard.leagueID
        })
        .then(leagueID => navigate(`/league/${leagueID}`))
        .catch(logError);
      }
  };
  const handleShowAll = () => {
    leaguesShown === 10
      ? setLeaguesShown(props.publicLeagues.length)
        : setLeaguesShown(10);
  };
    let tableType = 'league';
    let leagues = props.publicLeagues.slice(0, leaguesShown);
    let users = require('./../helpers/assets/icons/users.icon.svg');
    let lock = require('./../helpers/assets/icons/lock.icon.svg');
    return (
      <div className='leagues-container page-outer-div'>
        <div className='grid-container'>
          <BannerAd/>
          <div>
            <div className='row'>
              <div className='col-md-8'>
                <div className='mainContainer hideLarge'>
                  <div className='mainContainer-header'>
                    <div className='left'>
                      <img className='lock' src={lock} alt="lock icon" />
                      <p className='mainContainerHeader'>
                        PRIVATE LEAGUES
                      </p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private League! </p>
                          <LeagueAllPrivateForm onComplete={handlePrivateLeagueJoin}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                      <div className='left'>
                        <img className='users' src={users} alt="users icon" />
                        <p className='mainContainerHeader'>
                          PUBLIC LEAGUES
                        </p>
                      </div>
                      <div className='right'>
                        <p className='seeAll' onClick={handleShowAll}> See All</p>
                      </div>
                  </div>
                  <div className='container tableContainer allTableOuter'>
                    <div>
                      <p className='tableHeader'>Join A Public League</p>
                      <div className='tableColumnDiv groupTableColumnDiv allTableColumnDiv'>
                        <p className='tableColumn columnName'> LEAGUE NAME </p>
                        <p className='tableColumn columnCreator'> CREATOR </p>
                        <p className='tableColumn columnSize'> SIZE </p>
                      </div>
                    </div>
                    {leagues.map(league => {
                      let boundLeagueJoinClick = handleLeagueJoin.bind(this, league);
                      return <div className='rowColors cursor allTableContainer' key={league._id} onClick={boundLeagueJoinClick}>
                        <Table item={league} type={tableType} />
                      </div>
                    })}
                    <div className='spacerRow'></div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 hideMedium'>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                    <div className='left'>
                      <img className='lock' src={lock} alt="lock icon" />
                      
                      <p className='mainContainerHeader'>PRIVATE LEAGUES</p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private League </p>
                          <LeagueAllPrivateForm onComplete={handlePrivateLeagueJoin}/>
                        </div>
                      </div>
                    </div>
                  </div>
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
  leagues: state.leagues,
  groups: state.groups,
  publicLeagues: state.publicLeagues,
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
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  allPublicLeaguesFetch: () => dispatch(allPublicLeaguesFetchRequest()),
  leagueJoin: leagueID => dispatch(leagueJoinRequest(leagueID)),
  privateLeagueJoin: credentials => dispatch(privateLeagueJoinRequest(credentials)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  userPicksFetch: leagueID => dispatch(userPicksFetchRequest(leagueID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueAllContainer);