import React from 'react';
import { connect } from 'react-redux';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, groupFetchRequest, groupDeleteRequest, groupUpdateRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import MessageBoardContainer from '../message-board-container';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import * as util from '../../lib/util.js';

class GroupItemContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    return util.userValidation(this.props);
  }

  render(){
    let currentGroup = this.props.currentGroup;
    let random = require('./../helpers/assets/leagueGeneric.png');

    return (
      <div className='group-container page-outer-div'>
        <div className='grid-container'>
          <BannerAd/>
          <div className='row'>
            <div className='col-md-8'>
              <div className='mainContainer'> 
                <div className='outer'>
                  <div className='outerLeft'>
                    <i className='fa fa-users'></i>
                    <p className='headerText'>group text </p>
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


                <div className='mainContainer hideLarge margin16 mBottom16'>
                  <div className='mainContainer-header'>
                    <div className='left'>
                      <i className="fa fa-info-circle"></i>
                      <p className='mainContainerHeader'>GROUP INFO.</p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='margin16 groupInfoP'> Creator: <span className='groupInfoData'>{currentGroup.ownerName}</span></p>
                          <p className='margin16 groupInfoP'> Created On: <span className='groupInfoData'>{new Date(currentGroup.createdOn).toDateString()}</span></p>
                          <p className='margin16 groupInfoP'> Privacy: <span className='groupInfoData'>{currentGroup.privacy}</span></p>
                          <p className='margin16 groupInfoP'> Size: <span className='groupInfoData'>{currentGroup.size}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainContainer hideLarge margin16 mBottom16'>
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
                          {currentGroup.users.map((user, idx) => {
                            return <div className='rowColors' key={idx}>
                              <p className='margin16'><span>{user}</span></p>
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
                    <p className='mainContainerHeader'>GROUP INFO.</p>
                  </div>
                </div>
                <div className='mainContainerSection'>
                  <div className='mainContainerSectionWrapper'>
                    <div className='container'>
                      <div className='inner-wrapper'>
                        <p className='margin16 groupInfoP'> Creator: <span className='groupInfoData'>{currentGroup.ownerName}</span></p>
                        <p className='margin16 groupInfoP'> Created On: <span className='groupInfoData'>{new Date(currentGroup.createdOn).toDateString()}</span></p>
                        <p className='margin16 groupInfoP'> Privacy: <span className='groupInfoData'>{currentGroup.privacy}</span></p>
                        <p className='margin16 groupInfoP'> Size: <span className='groupInfoData'>{currentGroup.size}</span></p>
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
                        {currentGroup.users.map((user, idx) => {
                          return <div className='rowColors' key={idx}>
                            <p className='margin16'><span>{user}</span></p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemContainer);