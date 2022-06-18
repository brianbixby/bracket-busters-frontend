import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, groupProfilesFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest, leagueFetch, leagueJoinRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupFetchRequest, groupDeleteRequest, groupUpdateRequest, topPublicGroupsFetchRequest, groupFetch, groupJoinRequest } from '../../actions/group-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { userPicksFetchRequest } from '../../actions/userPick-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import { userValidation, logError, renderIf, formatDate } from '../../lib/util.js';

class GroupItemContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    let navigate = useNavigate();
    return userValidation(this.props, navigate)
      .then(() => {
        if (Object.entries(this.props.currentGroup).length === 0) {
          let myGroup = {_id: window.location.href.split('/group/')[1]};
          return this.props.groupFetch(myGroup)
            .then(group => {
              return this.props.groupProfilesFetch(group.users)
                .then(() => group)
            })
            .then(group => this.props.messageBoardGroupFetch(group._id))
            .then(mb => this.props.commentsFetch(mb.comments))
        }
        return ;
      })
      .then(() => window.scrollTo(0, 0))
      .catch(() => logError);
  }


  // onGroupClick = (group, e) => {
  //   this.props.groupFetchRequest(group)
  //   return this.props.groupProfilesFetch(group.users)
  //     .then(() => this.props.messageBoardGroupFetch(group._id))
  //     .then(messageBoard => {
  //       this.props.commentsFetch(messageBoard.comments);
  //     })
  //     .then(() =>  this.props.history.push(`/group/${group._id}`))
  //     .catch(logError);
  // };

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
  render(){
    let currentGroup = this.props.currentGroup;
    let groupProfiles = this.props.groupProfiles;
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores';
    let basketball = require('./../helpers/assets/basketball.png');
    let steph = require('./../helpers/assets/basketball.png');
    let groupPhoto = currentGroup.image ? <img className='createImg' src={currentGroup.image} /> : <img className='createImg' src={steph} />;
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.png');
    let users = require('./../helpers/assets/icons/users.icon.svg');
    let info = require('./../helpers/assets/icons/info.icon.svg');
    return (
      <div className='groupItem-page page-outer-div' id='top'>
        <div className='grid-container'>
          <BannerAd/>
          <div className='row'>
            <div className='col-md-8'>
              <div className='createOuter'>
                <div className='createOuterInner'>
                  <div className='outer'>
                    <div className='outerLeft'>
                      <img className='users' src={users} />
                      <p className='headerText'>GROUP</p>
                    </div>
                    <div className='outerRight'>
                    </div>
                  </div>
                  <div className='createMain'>
                    <div className='createMainWrapper'>
                      <div className='createMainContent'>
                        <div className='createMainBorder'></div>
                        <div>
                          <p className='createMainTitle'>{currentGroup.groupName}</p>
                          <p className='createMainSubtitle'>{currentGroup.motto}</p>
                        </div>
                      </div>
                      <div className='createImgDiv'>
                        {groupPhoto}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='joinOuter'>
                  <div className='joinWrapper'>
                    <div className='joinTextDiv'>
                      <div>
                        <p className='joinTextTitle'>
                          Group Info
                        </p>
                        <p className='joinTextSubtitle'>
                          Creator: {currentGroup.ownerName} <br></br>
                          Created: {formatDate(currentGroup.createdOn)} <br></br>
                          Privacy: {currentGroup.privacy} <br></br>
                          Size: {currentGroup.size}
                        </p>
                      </div>
                    </div>
                    <div className='joinImgDiv'>
                      <img className='info' src={info} />
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='sliderOuter'>
                    {renderIf(groupProfiles && groupProfiles.length > 0,
                      <div className='sliderOuterWrapper'>
                        {groupProfiles.map(groupProfile => {
                          return <div className='sliderInnerWrapper' key={groupProfile._id}>
                            <div className='cardOuter'>
                              <div className='cardItem'>
                                <div className='cardContentWrapper'>
                                  <div className='cardContentBorderTop'></div>
                                  <div className='cardContentDiv'>
                                    <p className='joinTextTitle'>{groupProfile.username}</p> 
                                  </div>
                                </div>
                                {renderIf(groupProfile.image,
                                  <div className='cardImageDiv'>
                                    <img className='groupMemberImg' src={groupProfile.image} />
                                  </div>
                                )}
                                {renderIf(!groupProfile.image,
                                  <div className='cardImageDiv'>
                                    <img className='groupMemberImgNoPhoto' src={placeholderImage} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>;
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className='m16'>
                  <MessageBoardContainer mBoardId={this.props.currentMessageBoard._id} commentsArray={this.props.currentMessageBoard.comments}/>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='leagueBoardsContainer'>
                <div className='leaguesContainerHeader'>
                  <img className='leaguesBoardIcon' src={basketball} />
                  <p className='leaguesBoardHeader'>LEAGUES</p>
                </div>
                <div className='tablesContainer'>
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
                </div>
              </div>
              <div className='leagueBoardsContainer'>
                <div className='leaguesContainerHeader'>
                  <img className='users' src={users} />
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
                  {this.props.topPublicGroups.map(topPublicGroup => {
                    let boundTopPublicGroupClick = this.handleBoundTopPublicGroupClick.bind(this, topPublicGroup);
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
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentLeague: state.currentLeague,
  currentGroup: state.currentGroup,
  currentMessageBoard: state.currentMessageBoard,
  scoreBoards: state.scoreBoards,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  groupProfiles: state.groupProfiles,
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
  groupFetch: group => dispatch(groupFetchRequest(group)),
  groupUpdate: group => dispatch(groupUpdateRequest(group)),
  groupDelete: group => dispatch(groupDeleteRequest(group)),
  leagueJoin: leagueID => dispatch(leagueJoinRequest(leagueID)),
  groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
  messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
  messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
  commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  groupProfilesFetch : profileIDs => dispatch(groupProfilesFetchRequest(profileIDs)),
  leagueFetchRequest: league => dispatch(leagueFetch(league)),
  groupFetchRequest: group => dispatch(groupFetch(group)),
  userPicksFetch: leagueID => dispatch(userPicksFetchRequest(leagueID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemContainer);