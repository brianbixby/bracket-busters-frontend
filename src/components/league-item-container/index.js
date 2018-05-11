import React from 'react';
import { connect } from 'react-redux';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueFetchRequest, leagueDeleteRequest, leagueUpdateRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { scoreBoardsFetchRequest, topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { gamesFetchRequest, gameUpdateRequest } from '../../actions/game-actions.js';
import { userPicksFetchRequest, userPickUpdateRequest, userPickCreateRequest, userPickFetchRequest, } from '../../actions/userPick-actions.js';
import UserPickContainer from '../user-pick-container';
import GameItem from '../game-item';
import UserPickItem from '../user-pick-item';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import * as util from '../../lib/util.js';

class LeagueContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { maxHeight: true };
  }

  componentWillMount() {
    util.userValidation(this.props);
    this.props.scoreBoardsFetch(this.props.currentLeague._id)
      .then(() => {
        this.props.userPicksFetch(this.props.currentLeague._id)
        .then(picks => {
          let gameIDArr = [];
          gameIDArr.push(picks.map(userPick => userPick.gameID._id));
          return this.props.gamesFetch(this.props.currentLeague.sportingEventID, gameIDArr)
        })
        .catch(util.logError);
      })
  }

  componentDidMount(){
    // this.props.userPicksFetch(this.props.currentLeague._id)
    //   .then(picks => {
    //     let gameIDArr = [];
    //     gameIDArr.push(picks.map(userPick => userPick.gameID._id));
    //     return this.props.gamesFetch(this.props.currentLeague.sportingEventID, gameIDArr)
    //   })
    //   .catch(util.logError);
  }

  handleComplete = league => {
    return this.props.leagueUpdate(league)
      .then(() => this.props.history.push(`/league/${this.props.league._id}`))
      .catch(util.logError);
  }

  handleUpdate = userPick => {
    return this.props.userPickUpdate(userPick)
      .catch(console.error);
  };

  handleCreate = userPick => {
    userPick.leagueID= this.props.currentLeague._id;
    return this.props.userPickCreate(userPick)
      .then(userPick => this.props.userPickFetch(userPick._id))
      .catch(console.error);
  };

  handleMaxHeight = () => this.setState({ maxHeight:!this.state.maxHeight });

  render(){
    let scoreBoards = 'scores';
    let nbalogo = require('./../helpers/assets/nba-logo.png');
    let maxHeight = this.state.isHovered ? 'hovTransform homeTeamContent' : 'homeTeamContent';
    return (
      <div className='page-outer-div leagueContainer'>
        <div className='grid-container'>
          <div className='row'>
          <div className='col-md-8'>
            {util.renderIf(this.props.games.length > 0,
              <div className='wideSectionWrapper'>
                <div className='outer'>
                  <div className='outerLeft'>
                    <img src={nbalogo} />
                    <p className='headerText'>UNPICKED GAMES </p>
                    <p className='subheaderText'> </p>
                  </div>
                  <div className='outerRight'>
                    <p className='seeAll'>See All</p>
                  </div>
                </div>
                <div className='gamesDiv'>
                  {this.props.games.map(game =>
                    <div key={game._id} className='margin16'>
                      <GameItem  game={game} onComplete={this.handleCreate}/>
                    </div>
                  )}
                </div>
              </div>
            )}


            {/* {util.renderIf(this.props.games.length > 0,
              <div className='wideSectionWrapper'>
                <div className='outer'>
                  <div className='outerLeft'>
                    <img src={nbalogo} />
                    <p className='headerText'>UNPICKED GAMES </p>
                    <p className='subheaderText'> </p>
                  </div>
                  <div className='outerRight'>
                    <p className='seeAll'>See All</p>
                  </div>
                </div>
                <div className='gamesDiv'>
                  {this.props.games.map(game =>
                    <div key={game._id} className='margin16'>
                      <GameItem  game={game} onComplete={this.handleCreate}/>
                    </div>
                  )}
                </div>
              </div>
            )} */}


            {util.renderIf(this.props.userPicks.length > 0,
              <div className='wideSectionWrapper'>
                <div className='outer'>
                  <div className='outerLeft'>
                    <img src={nbalogo} />
                    <p className='headerText'>PICKS </p>
                    <p className='subheaderText'> </p>
                  </div>
                  <div className='outerRight'>
                    <p className='seeAll'>See All</p>
                  </div>
                </div>
                <div className='userPicksDiv'>
                  {this.props.userPicks.map((userPick, idx) =>
                    <div key={idx} className='margin16'>
                      <UserPickItem  userPick={userPick} onUpdate={this.handleUpdate}/>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='col-md-4'>
            <div className='leagueBoardsContainer'>
              <div className='leaguesContainerHeader'>
                <i className="fa fa-users"></i>
                <p className='leaguesBoardHeader'>LEADERBOARD</p>
              </div>
              <div className='container tableContainer'>
                <div>
                  <p className='tableHeadline hideMed'>LEADERBOARD</p>
                  <div className='tableColumnDiv'>
                    <p className='tableColumn columnUser'> USER NAME </p>
                    <p className='tableColumn columnScore'> SCORE </p>
                  </div>
                </div>
                {this.props.scoreBoards.map(scoreBoard => {
                  return <div className='rowColors' key={scoreBoard._id}>
                    <Table item={scoreBoard} type={scoreBoards} />
                  </div>
                })}
                <div className='spacerRow'> </div>
              </div>
            </div>

              <div className={this.state.maxHeight ? 'wideSectionWrapper maxHeight maxWidth294Big' : 'wideSectionWrapper maxWidth294Big'}>
                <div className='outer messageboardHeader'>
                  <div className='outerLeft'>
                    <i className="fa fa-comments"></i>
                    <p className='headerText'>MESSAGE BOARD </p>
                  </div>
                  <div className='outerRight'>
                    <p className='seeAll' onClick={this.handleMaxHeight}>See All</p>
                  </div>
                </div>
                <MessageBoardContainer mBoardId={this.props.currentMessageBoard._id}/>
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
  currentLeague: state.currentLeague,
  currentMessageBoard: state.currentMessageBoard,
  scoreBoards: state.scoreBoards,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);