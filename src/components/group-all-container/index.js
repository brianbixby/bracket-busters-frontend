import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, groupProfilesFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, allPublicGroupsFetchRequest, groupJoinRequest, privateGroupJoinRequest, groupFetch, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { messageBoardGroupFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentsFetchRequest } from '../../actions/comment-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import GroupAllPrivateForm from '../group-all-private-form';
import Table from '../helpers/table';
import BannerAd from '../helpers/bannerAd';
import { userValidation, logError } from './../../lib/util.js';

function GroupAllContainer(props) {
    let navigate = useNavigate();
    const [groupsShown, setGroupsShown] = useState(10);

    useEffect(() => {
        userValidation(props, navigate)
            .then(() => props.allPublicGroupsFetch())
            .catch(() => logError);
    }, [])

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
  const handleGroupJoin = (group, e) => {
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
  const handlePrivateGroupJoin = credentials => {
    let group;
    if (props.groups.some(groups => {
      if(groups.groupName === credentials.groupName)
        return group = groups;
    }
    )) {
      onGroupClick(group);
    }
    else {
      return props.privateGroupJoin(credentials)
      .then(group => {
        props.groupProfilesFetch(group.users);
        return group;
      })
      .then(group => props.messageBoardGroupFetch(group._id))
      .then(messageBoard => {
        props.commentsFetch(messageBoard.comments);
        return messageBoard.groupID
      })
      .then(groupID => props.history.push(`/group/${groupID}`))
      .catch(logError);
    }
  };
  const handleShowAll = () => {
    groupsShown === 10
      ? setGroupsShown(props.publicGroups.length)
        : setGroupsShown(10);
  };
    let tableType = 'group';
    let groups = props.publicGroups.slice(0, groupsShown);
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
                      <img className='lock' src={lock} alt="Lock icon" />
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
                          <GroupAllPrivateForm onComplete={handlePrivateGroupJoin}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                      <div className='left'>
                        <img className='users' src={users} alt="Users icon" />
                        <p className='mainContainerHeader'>
                          PUBLIC GROUPS
                        </p>
                      </div>
                      <div className='right'>
                        <p className='seeAll' onClick={handleShowAll}> See All</p>
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
                      let boundGroupJoinClick = handleGroupJoin.bind(this, group);
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
                      <img className='lock' src={lock} alt="Lock icon" />
                      <p className='mainContainerHeader'>PRIVATE GROUPS</p>
                    </div>
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <p className='allHeader'>Join A Private Group </p>
                          <GroupAllPrivateForm onComplete={handlePrivateGroupJoin}/>
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
    groupProfilesFetch : profileIDs => dispatch(groupProfilesFetchRequest(profileIDs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAllContainer);