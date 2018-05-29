import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from '../navbar';
import LandingContainer from '../landing-container';
import LeagueAllContainer from '../league-all-container';
import LeagueItemContainer from '../league-item-container';
import GroupAllContainer from '../group-all-container';
import GroupItemContainer from '../group-item-container';
import ProfileContainer from '../profile-container';
import { signIn, tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Route path='*' component={Navbar} />
          <Route exact path='/' component={LandingContainer} />
          <Route exact path='/leagues' component={LeagueAllContainer} />
          <Route exact path='/league/:leagueID' component={LeagueItemContainer} />
          <Route exact path='/groups' component={GroupAllContainer} />
          <Route path='/group/:groupID' component={GroupItemContainer} />
          <Route exact path='/user/:profileID' component={ProfileContainer} /> 
        </section>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  signIn: token => dispatch(signIn(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);