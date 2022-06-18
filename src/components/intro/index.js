import React from 'react';
import { connect } from 'react-redux';

import { signUpRequest, signInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import { leaguesFetchRequest, topPublicLeaguesFetchRequest } from '../../actions/league-actions.js';
import { groupsFetchRequest, topPublicGroupsFetchRequest } from '../../actions/group-actions.js';
import { topScoresFetchRequest } from '../../actions/scoreboard-actions.js';
import { sportingEventsFetchRequest } from '../../actions/sportingEvent-actions.js';
import Modal from '../helpers/modal';
import UserAuthForm from '../userAuth-form';
import { logError, renderIf } from './../../lib/util.js';

class Intro extends React.Component {
  constructor(props){
    super(props);
    this.state = { authFormAction: 'Sign Up', formDisplay: false, };
  }
  handleSignin = (user, errCB) => {
    return this.props.signIn(user)
      .then(() => {
        return this.props.sportingEventsFetch()
          .catch(() => logError);
      })
      .then(sportingEvent => {
        return this.props.userProfileFetch()
          .then(profile => {
            return {sportingEventID: sportingEvent._id, leagues: profile.body.leagues, groups: profile.body.groups};
          })
          .catch(() => logError);
      })
      .then(returnObj => {
        if(returnObj.leagues.length)
          this.props.leaguesFetch(returnObj.leagues)
            .catch(() => logError);
        return returnObj;
      })
      .then(returnObj => {
        if(returnObj.groups.length)
          this.props.groupsFetch(returnObj.groups)
            .catch(() => logError);
        return returnObj;
      })
      .then(returnObj => {
        if(!returnObj.leagues) 
          returnObj.leagues = [];
        return this.props.topPublicLeaguesFetch(returnObj.sportingEventID, returnObj.leagues)
          .then(() => returnObj)
          .catch(() => logError);
      })
      .then(returnObj => {
        return this.props.topScoresFetch(returnObj.sportingEventID)
          .then(() => returnObj)
          .catch(() => logError);
      })
      .then(returnObj => {
        if(!returnObj.groups) 
          returnObj.groups = [];
        this.props.topPublicGroupsFetch(returnObj.groups)
          .catch(() => logError);
      })
      .catch(err => {
        logError(err);
        errCB(err);
      });
  };
  handleSignup = (user, errCB) => {
    return this.props.signUp(user)
      .then(() => {
        return this.props.sportingEventsFetch()
          .catch(() => logError);
      })
      .then(sportingEvent => {
        return this.props.userProfileFetch()
          .then(profile => {
            return {sportingEventID: sportingEvent._id, leagues: profile.body.leagues, groups: profile.body.groups};
          })
          .catch(() => logError);
      })
      .then(returnObj => {
        if(returnObj.leagues.length)
          this.props.leaguesFetch(returnObj.leagues)
            .catch(() => logError);
        return returnObj;
      })
      .then(returnObj => {
        if(returnObj.groups.length)
          this.props.groupsFetch(returnObj.groups)
            .catch(() => logError);
        return returnObj;
      })
      .then(returnObj => {
        if(!returnObj.leagues) 
          returnObj.leagues = [];
        return this.props.topPublicLeaguesFetch(returnObj.sportingEventID, returnObj.leagues)
          .then(() => returnObj)
          .catch(() => logError);
      })
      .then(returnObj => {
        return this.props.topScoresFetch(returnObj.sportingEventID)
          .then(() => returnObj)
          .catch(() => logError);
      })
      .then(returnObj => {
        if(!returnObj.groups) 
          returnObj.groups = [];
        this.props.topPublicGroupsFetch(returnObj.groups)
          .catch(() => logError);
      })
      .catch(err => {
        logError(err);
        errCB(err);
    });
  };
  render() {
    let background = require('./../helpers/assets/introBackground.png');
    let lebron = require('./../helpers/assets/introLebron.png');
    let curry = require('./../helpers/assets/introCurry.png');
    let handleComplete = this.state.authFormAction === 'Sign Up' ? this.handleSignup : this.handleSignin;
    return (
      <div className="intro">
        <section id="introView" className="view introView">
          <div>
            <h1 className="headline center">CREATE YOUR OWN LEAGUE!</h1>
          </div>
          <div className="banner-image">
            <div className="background">
              <img className="intro-background intro-images" src={background} alt="background" />
              <img className="intro-curry intro-images" src={curry} alt="Steph Curry" />
              <img className="intro-lebron intro-images" src={lebron} alt="Lebron James" />
            </div>
          </div>
          <div>
            <div className="narrow-container center">
              <p className="description">
                Bracket Busters users compete against their friends by choosing winners for real world sports games. You are able to create and manage your own leagues and will have a personal scoreboard for each participant. Each league will also have its own message board that will allow you to communicate with those in your league. Each league also has the option to be private or public.
              </p>
              <p className='creator'>BY BRIAN BIXBY</p>
              <button className='button' onClick={() => this.setState({formDisplay: true})}id="start-button" >
                START
              </button>
            </div>
          </div>
        </section>
          <div>
            {renderIf(this.state.formDisplay,
              <div>
                <Modal heading='Bracket Busters' close={() => this.setState({ formDisplay: false })}>
                  <UserAuthForm authFormAction={this.state.authFormAction} onComplete={handleComplete} />

                  <div className='userauth-buttons'>
                    {renderIf(this.state.authFormAction==='Sign In',
                      <button className='b-button dark-button' onClick={() => this.setState({authFormAction: 'Sign Up'})}>Sign Up</button>
                    )}

                    {renderIf(this.state.authFormAction==='Sign Up',
                      <button className='b-button dark-button' onClick={() => this.setState({authFormAction: 'Sign In'})}>Sign In</button>
                    )}
                  </div>
                </Modal>
              </div>
            )}
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
});

let mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUpRequest(user)),
    signIn: user => dispatch(signInRequest(user)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
    leaguesFetch: leagueArr => dispatch(leaguesFetchRequest(leagueArr)),
    groupsFetch: groupArr => dispatch(groupsFetchRequest(groupArr)),
    sportingEventsFetch: () => dispatch(sportingEventsFetchRequest()),
    topPublicLeaguesFetch: (sportingEventID, leaguesIDArr) => dispatch(topPublicLeaguesFetchRequest(sportingEventID, leaguesIDArr)),
    topScoresFetch: sportingeventID => dispatch(topScoresFetchRequest(sportingeventID)),
    topPublicGroupsFetch: groupsIDArr => dispatch(topPublicGroupsFetchRequest(groupsIDArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);