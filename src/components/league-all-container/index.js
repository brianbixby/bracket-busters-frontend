import React from 'react';
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

class LeagueAllContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { leaguesShown: 10 };
  }
  componentWillMount() {
    let navigate = useNavigate();
    return userValidation(this.props, navigate)
      .then(() => {
        return this.props.allPublicLeaguesFetch()
          .catch(() => logError);
      })
      .catch(() => logError);
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
  handleLeagueJoin = (league, e) => {
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
  handlePrivateLeagueJoin = credentials => {
    let league;
    if (this.props.leagues.some(leagues => {
      if(leagues.leagueName === credentials.leagueName)
        return league = leagues;
    }
    )) {
      this.onLeagueClick(league);
    }
    else {
      return this.props.privateLeagueJoin(credentials)
        .then(league => this.props.messageBoardLeagueFetch(league._id))
        .then(messageBoard => {
          this.props.commentsFetch(messageBoard.comments);
          return messageBoard.leagueID
        })
        .then(leagueID => this.props.history.push(`/league/${leagueID}`))
        .catch(logError);
      }
  };
  handleShowAll = () => {
    this.state.leaguesShown === 10
      ? this.setState({ leaguesShown: this.props.publicLeagues.length})
        : this.setState({ leaguesShown: 10});
  };
  render(){
    let tableType = 'league';
    let leagues = this.props.publicLeagues.slice(0, this.state.leaguesShown);
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
                      <img className='lock' src={lock} />
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
                          <LeagueAllPrivateForm onComplete={this.handlePrivateLeagueJoin}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                      <div className='left'>
                        <img className='users' src={users} />
                        <p className='mainContainerHeader'>
                          PUBLIC LEAGUES
                        </p>
                      </div>
                      <div className='right'>
                        <p className='seeAll' onClick={this.handleShowAll}> See All</p>
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
                      let boundLeagueJoinClick = this.handleLeagueJoin.bind(this, league);
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
                      <img className='lock' src={lock} />
                      
                      <p className='mainContainerHeader'>PRIVATE LEAGUES</p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private League </p>
                          <LeagueAllPrivateForm onComplete={this.handlePrivateLeagueJoin}/>
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