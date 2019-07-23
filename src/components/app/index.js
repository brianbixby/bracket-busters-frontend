import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { makeAsyncComponent } from "./../../lib/util.js";
import Navbar from '../navbar';
import LandingContainer from '../landing-container';

const LeagueAllContainer = makeAsyncComponent(import('../league-all-container'));
const LeagueItemContainer = makeAsyncComponent(import('../league-item-container'));
const GroupAllContainer = makeAsyncComponent(import('../group-all-container'));
const GroupItemContainer = makeAsyncComponent(import('../group-item-container'));
const ProfileContainer = makeAsyncComponent(import('../profile-container'));

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
          <Route exact path='/group/:groupID' component={GroupItemContainer} />
          <Route exact path='/user/:profileID' component={ProfileContainer} />
        </section>
      </BrowserRouter>
    );
  }
}

export default App;