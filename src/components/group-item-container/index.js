import React from 'react';
import { connect } from 'react-redux';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, groupProfilesFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest, leagueFetch, leagueJoinRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupFetchRequest, groupDeleteRequest, groupUpdateRequest, topPublicGroupsFetchRequest, groupFetch, groupJoinRequest } from '../../actions/group-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { messageBoardLeagueFetchRequest, messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import MessageBoardContainer from '../message-board-container';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import * as util from '../../lib/util.js';

class GroupItemContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    util.userValidation(this.props);
    // this.props.groupProfilesFetch(this.props.currentGroup.users)
    //   .catch(util.logError);
  }

  // componentDidMount() {
  //   this.props.groupProfilesFetch(this.props.currentGroup.users)
  //     .catch(util.logError);
  // }

  formatDate = date => {
    let dateArr = new Date(date).toDateString().split(' ');
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

  handleBoundTopPublicLeagueClick = (league, e) => {
    return this.props.leagueJoin(league._id)
      .then(() => this.props.messageBoardLeagueFetch(league._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/league/${league._id}`))
      .catch(util.logError);
  };

  handleBoundTopPublicGroupClick = (group, e) => {
    return this.props.groupProfilesFetch(group.users)
      .then(() => this.props.groupJoin(group._id))
      .then(() => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  };

  render(){
    let currentGroup = this.props.currentGroup;
    let groupProfiles = this.props.groupProfiles;
    // let random = require('./../helpers/assets/leagueGeneric.png');
    let formTypeLeague = 'league';
    let formTypeGroup = 'group';
    let topScores = 'scores';
    let basketball = require('./../helpers/assets/basketball.png');
    let groupPhoto = currentGroup.image ? <img className='createImg' src={currentGroup.image} /> : <img className='createImg' src='https://i.imgur.com/xjGJJvv.jpg' />;
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.jpeg');

    return (
      <div className='groupItem-page page-outer-div'>
        <div className='grid-container'>
          <BannerAd/>
          <div className='row'>
            <div className='col-md-8'>
              <div className='createOuter'>
                <div className='createOuterInner'>
                  <div className='outer'>
                    <div className='outerLeft'>
                      <i className="fa fa-users"></i>
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
                          Created: {this.formatDate(currentGroup.createdOn)} <br></br>
                          Privacy: {currentGroup.privacy} <br></br>
                          Size: {currentGroup.size}
                        </p>
                      </div>
                    </div>
                    <div className='joinImgDiv'>
                      <i className="fa fa-info-circle"></i>
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <div className='sliderOuter'>
                    {util.renderIf(groupProfiles && groupProfiles.length > 0,
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
                                {util.renderIf(groupProfile.image,
                                  <div className='cardImageDiv'>
                                    <img className='createImg' src={groupProfile.image} />
                                  </div>
                                )}
                                {util.renderIf(!groupProfile.image,
                                  <div className='cardImageDiv'>
                                    <img className='createImg' src={placeholderImage} />
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
                  <i className="fa fa-users"></i>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemContainer);


{/* <div className='group-container page-outer-div'>
<div className='grid-container'>
  <BannerAd/>
  <div className='row'>
    <div className='col-md-8'>
      <div className='mainContainer'> 
        <div className='outer'>
          <div className='outerLeft'>
            <i className='fa fa-users'></i>
            <p className='headerText'>GROUP </p>
          </div>
          <div className='outerRight'>
          </div>
        </div>
        <div className='createMain'>
          <div className='createMainWrapper'>
            <div className='createMainContent'>
              <div className='createMainBorder'></div>
              <div>
                <p className='createMainTitle'> {currentGroup.groupName} </p>
                <p className='createMainSubtitle'>{currentGroup.motto}</p>
              </div>
            </div>
            <div className='createImgDiv'>
              <img className="createImg" src={currentGroup.image} />
            </div>
          </div>
        </div>
        <div className='mainContainer hideLarge margin16 mBottom16 leagueBoards'>
          <div className='mainContainer-header borderBottom'>
            <div className='left'>
              <i className="fa fa-info-circle"></i>
              <p className='mainContainerHeader'>GROUP INFO</p>
            </div>
            <div className='right'>
            </div>
          </div>
          <div className='mainContainerSection'>
            <div className='mainContainerSectionWrapper noBorder'>
              <div className='container'>
                <div className='inner-wrapper'>
                  <p className='margin16 groupInfoP'> <span className='groupInfoLabel'>Creator: </span> <span className='groupInfoData'>{currentGroup.ownerName}</span></p>
                  <p className='margin16 groupInfoP'> <span className='groupInfoLabel'>Created: </span> <span className='groupInfoData'>{this.formatDate(currentGroup.createdOn)}</span></p>
                  <p className='margin16 groupInfoP'> <span className='groupInfoLabel'>Privacy: </span> <span className='groupInfoData'>{currentGroup.privacy}</span></p>
                  <p className='margin16 groupInfoP'> <span className='groupInfoLabel'>Size: </span> <span className='groupInfoData'>{currentGroup.size}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mainContainer hideLarge margin16 mBottom16 leagueBoards medGroupMembersBox'>
          <div className='mainContainer-header'>
            <div className='left'>
              <i className="fa fa-users"></i>
              <p className='mainContainerHeader'>GROUP MEMBERS</p>
            </div>
          </div>
          <div className='mainContainerSection'>
            <div className='mainContainerSectionWrapper noBorder'>
              <div className='container'>
                <div className='inner-wrapper'>
                  {currentGroup.userNames.map((user, idx) => {
                    return <div className='rowColors2' key={idx}>
                      <p className='margin16 padding8'><span>{user}</span></p>
                    </div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className='margin16'>
          <MessageBoardContainer mBoardId={this.props.currentMessageBoard._id} commentsArray={this.props.currentMessageBoard.comments}/>
        </div>
      </div>
    </div>
    <div className='col-md-4 hideMedium'>
      <div className='mainContainer'>
        <div className='mainContainer-header'>
          <div className='left'>
            <i className="fa fa-info-circle"></i>
            <p className='mainContainerHeader'>GROUP INFO</p>
          </div>
        </div>
        <div className='mainContainerSection'>
          <div className='mainContainerSectionWrapper'>
            <div className='container'>
              <div className='inner-wrapper'>
                <p className='margin24 groupInfoP'> Creator: <span className='groupInfoData'>{currentGroup.ownerName}</span></p>
                <p className='margin24 groupInfoP'> Created: <span className='groupInfoData'>{this.formatDate(currentGroup.createdOn)}</span></p>
                <p className='margin24 groupInfoP'> Privacy: <span className='groupInfoData'>{currentGroup.privacy}</span></p>
                <p className='margin24 groupInfoP'> Size: <span className='groupInfoData'>{currentGroup.size}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
        <div className='mainContainer-header'>
          <div className='left'>
            <i className="fa fa-users"></i>
            <p className='mainContainerHeader'>GROUP MEMBERS</p>
          </div>
        </div>
        <div className='mainContainerSection'>
          <div className='mainContainerSectionWrapper'>
            <div className='container'>
              <div className='inner-wrapper'>
                {currentGroup.userNames.map((user, idx) => {
                  return <div className='rowColors2' key={idx}>
                    <p className='margin24 padding8'><span>{user}</span></p>
                  </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */}