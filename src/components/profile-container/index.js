import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ProfileForm from '../profile-form';
import BannerAd from '../helpers/bannerAd';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import { userValidation, logError, formatDate, renderIf } from './../../lib/util.js';

function ProfileContainer(props) {
    let navigate = useNavigate();
    useEffect(() => {
        userValidation(props, navigate);
    }, [])
  const handleProfileUpdate = profile => {
    return props.userProfileUpdate(profile)
      .catch(logError);
  };
    let profileAction='update';
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.png');
    let profileImage = props.userProfile && props.userProfile.image ? props.userProfile.image : placeholderImage;
    let { userProfile } = props;
    let username = userProfile ? userProfile.username : null;
    let createdOn = userProfile ? userProfile.createdOn : null;
    return (
      <div className='profile-container page-outer-div'>
        <div className='grid-container'>
          <BannerAd/>
          <div>
            <div className='row'>
              <div className='col-md-8'>
                <div className='createOuter'>
                  {renderIf(userProfile,
                    <div className='page-form'>
                      <ProfileForm 
                        userProfile={userProfile} 
                        onComplete={handleProfileUpdate}
                        profileAction={profileAction}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-4 hideMedium'>
                <div className='mainContainer'>
                  <div className='mainContainer-header'>
                    {renderIf(userProfile,
                      <div className='left'>
                        <p className='mainContainerHeader'>{username}</p>
                      </div>
                    )}
                  </div>
                  <div className='mainContainerSection'>
                    <div className='mainContainerSectionWrapper'>
                      <div className='container'>
                        <div className='inner-wrapper'>
                          <div className='profile-image-div'>
                            <img className='profile-image' src={profileImage} alt="profile" />
                          </div>
                            {renderIf(userProfile,
                              <div className='userProfileData'>
                                <p>Member Since: {formatDate(createdOn)}</p>
                              </div>
                            )}
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

let mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  leagues: state.leagues,
  groups: state.groups,
  sportingEvent: state.sportingEvent,
  topPublicLeagues: state.topPublicLeagues,
  topScores: state.topScores,
  topPublicGroups: state.topPublicGroups,
})

let mapDispatchToProps = (dispatch) => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
  groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
  sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
  topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
  topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
  topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);