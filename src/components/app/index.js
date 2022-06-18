import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Navbar = lazy(() => import("../navbar"));
const LandingContainer = lazy(() => import("../landing-container"));
const LeagueAllContainer = lazy(() => import('../league-all-container'));
const LeagueItemContainer = lazy(() => import('../league-item-container'));
const GroupAllContainer = lazy(() => import('../group-all-container'));
const GroupItemContainer = lazy(() => import('../group-item-container'));
const ProfileContainer = lazy(() => import('../profile-container'));

function App() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingContainer />} />
            <Route path="/leagues" element={<LeagueAllContainer />} />
            <Route path="/league/:leagueID" element={<LeagueItemContainer />} />
            <Route path="/groups" element={<GroupAllContainer />} />
            <Route path="/group/:groupID" element={<GroupItemContainer />} />
            <Route path="/user/:profileID" element={<ProfileContainer />} />
          </Routes>
        </Suspense>
      </div>
    );
  }
  
  export default App;