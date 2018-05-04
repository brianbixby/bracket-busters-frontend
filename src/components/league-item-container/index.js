import React from 'react';
import { connect } from 'react-redux';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, leagueFetchRequest, leagueDeleteRequest, leagueUpdateRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { scoreBoardsFetchRequest, topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import UserPickContainer from '../user-pick-container';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import * as util from '../../lib/util.js';

class LeagueContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    util.userValidation(this.props);
    this.props.scoreBoardsFetch(this.props.currentLeague._id);
  }

  handleComplete = league => {
    return this.props.leagueUpdate(league)
      .then(() => this.props.history.push(`/league/${this.props.league._id}`))
      .catch(util.logError);
  }

  render(){
    let scoreBoards = 'scores';
    return (
      <div className='leagueItem-container page-outer-div'>
        <div className='grid-container'>
          <UserPickContainer sportingEventID={this.props.currentLeague.sportingEventID} leagueID={this.props.currentLeague._id} />
          <MessageBoardContainer mBoardId={this.props.currentMessageBoard._id}/>
          <div className='container'>
            <div>
              <p className='tableHeadline'>LEADERBOARD</p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);