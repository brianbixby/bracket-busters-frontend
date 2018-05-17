import React from 'react';
import { connect } from 'react-redux';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, allPublicGroupsFetchRequest, groupJoinRequest, privateGroupJoinRequest, groupFetch, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import GroupAllPrivateForm from '../group-all-private-form';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import * as util from './../../lib/util.js';

class GroupAllContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { groupsShown: 10 };
  }

  componentWillMount() {
    util.userValidation(this.props);
    this.props.allPublicGroupsFetch();
  }

  handleGroupJoin = (group, e) => {
    return this.props.groupJoin(group._id)
      .then(() => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => this.props.commentsFetch(messageBoard.comments))
      .then(() => this.props.history.push(`/group/${group._id}`))
      .catch(util.logError);
  };

  handlePrivateGroupJoin = credentials => {
    return this.props.privateGroupJoin(credentials)
      .then(group => this.props.messageBoardGroupFetch(group._id))
      .then(messageBoard => {
        this.props.commentsFetch(messageBoard.comments);
        return messageBoard.groupID
      })
      .then(groupID => this.props.history.push(`/group/${groupID}`))
      .catch(util.logError);
  };

  handleShowAll = () => {
    this.state.groupsShown === 10
      ? this.setState({ groupsShown: this.props.publicGroups.length})
        : this.setState({ groupsShown: 10});
  };

  render() {
    let tableType = 'group';
    let groups = this.props.publicGroups.slice(0, this.state.groupsShown);
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
                      <i className="fa fa-lock"></i>
                      <p className='mainContainerHeader'>
                        PRIVATE GROUPS
                      </p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private Group </p>
                          <GroupAllPrivateForm onComplete={this.handlePrivateGroupJoin}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                      <div className='left'>
                        <i className="fa fa-users"></i>
                        <p className='mainContainerHeader'>
                          PUBLIC GROUPS
                        </p>
                      </div>
                      <div className='right'>
                        <p className='seeAll' onClick={this.handleShowAll}> See All</p>
                      </div>
                  </div>
                  <div className='container tableContainer allTableOuter'>
                    <div>
                      <p className='tableHeader'>Join A Public Group</p>
                      <div className='tableColumnDiv groupTableColumnDiv allTableColumnDiv'>
                        <p className='tableColumn columnName'> GROUP NAME </p>
                        <p className='tableColumn columnCreator'> CREATOR </p>
                        <p className='tableColumn columnSize'> SIZE </p>
                      </div>
                    </div>
                    {groups.map(group => {
                      let boundGroupJoinClick = this.handleGroupJoin.bind(this, group);
                      return <div className='rowColors cursor allTableContainer' key={group._id} onClick={boundGroupJoinClick}>
                        <Table item={group} type={tableType} />
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
                      <i className="fa fa-lock"></i>
                      <p className='mainContainerHeader'>PRIVATE GROUPS</p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private Group </p>
                          <GroupAllPrivateForm onComplete={this.handlePrivateGroupJoin}/>
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
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
  publicGroups: state.publicGroups,
});

let mapDispatchToProps = dispatch => {
  return {
    tokenSignIn: token => dispatch(tokenSignInRequest(token)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
    leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
    groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
    sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
    topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
    topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
    topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
    allPublicGroupsFetch: () => dispatch(allPublicGroupsFetchRequest()),
    groupJoin: groupID => dispatch(groupJoinRequest(groupID)),
    privateGroupJoin: credentials => dispatch(privateGroupJoinRequest(credentials)),
    groupFetchRequest: group => dispatch(groupFetch(group)),
    messageBoardGroupFetch: groupID => dispatch(messageBoardGroupFetchRequest(groupID)),
    commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAllContainer);