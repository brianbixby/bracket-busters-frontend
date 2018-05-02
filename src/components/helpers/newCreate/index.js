import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NewJoinSection from './../newJoin';
import Slider from './../slider';
// import { leagueFetch } from './../../../actions/league-actions.js';
// import { messageBoardLeagueFetchRequest } from './../../../actions/messageBoard-actions.js';
// import { commentsFetchRequest } from './../../../actions/comment-actions.js';
import * as util from './../../../lib/util.js';

class NewCreateSection extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  // onLeagueClick = (league, e) => {
  //   let { history } = this.props;
  //   this.props.leagueFetchRequest(league);
  //   return this.props.messageBoardLeagueFetch(league._id)
  //     .then(messageBoard => {
  //       this.props.commentsFetch(messageBoard.comments);
  //     })
  //     // .then(() =>  window.location = `/league/${league._id}`)
  //     .then(() =>  history.push(`/league/${league._id}`))
  //     .catch(util.logError);
  // }

  render() {
    let muscles = require('./../assets/muscles.png');
    let holla = require('./../assets/holla.png');

    return (
      <div className='createOuter'>
        <div className='createOuterInner' onClick={this.props.handleCreate}>
          <div className='createHeader'>
            <div className='eventDetails'>
              <p className='eventNote'>2018 NBA PLAYOFFS</p>
            </div>
            <div className='createHeadline'>
              <p className='contentHeader'>ANOTHER HISTORIC SERIES</p>
            </div>
          </div>
          <div className='createMain'>
            <div className='createMainWrapper'>
              <div className='createMainContent'>
                <div className='createMainBorder'></div>
                <div>
                  <p className='createMainTitle'> Create a {this.props.formType}, and beat your friends! </p>
                  {util.renderIf(this.props.formType === 'league',
                    <p className='createMainSubtitle'>You&#39;re the League Manager here. Set up a private or public league and play with your family and friends!</p>
                  )}
                  {util.renderIf(this.props.formType === 'group',
                    <p className='createMainSubtitle'>You&#39;re the leader of the group. Set up a private or public group to cheer on your favorite team with your family and friends!</p>
                  )}
                </div>
              </div>
              <div className='createImgDiv'>
                {util.renderIf(this.props.formType === 'league',
                  <img className="createImg" src={muscles} />
                )}
                {util.renderIf(this.props.formType === 'group',
                  <img className="createImg" src={holla} />
                )}  
              </div>
            </div>
          </div>
        </div>
        <NewJoinSection joinType={this.props.joinType}/>
        {util.renderIf(this.props.leagues,
          <div className='container'>
            <div className='sliderOuter'>
              <div className='sliderOuterWrapper'>
                {this.props.leagues.map(league => {
                  let boundLeagueClick = this.props.handleLeagueClick.bind(this, league);
                  return <div className='sliderInnerWrapper' key={league._id}>
                    <div className='cardOuter' onClick={boundLeagueClick}>
                      <Slider league={league} />
                    </div>
                  </div>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// let mapStateToProps = state => ({
//   userAuth: state.userAuth,
//   userProfile: state.userProfile,
//   leagues: state.leagues,
//   groups: state.groups,
// });

// let mapDispatchToProps = dispatch => ({
//   leagueFetchRequest: league => dispatch(leagueFetch(league)),
//   messageBoardLeagueFetch: leagueID => dispatch(messageBoardLeagueFetchRequest(leagueID)),
//   commentsFetch: commentArr => dispatch(commentsFetchRequest(commentArr)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(NewCreateSection);

export default NewCreateSection;