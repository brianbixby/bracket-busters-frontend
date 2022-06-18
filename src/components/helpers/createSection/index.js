import React from 'react';

import JoinSection from './../joinSection';
import Slider from './../slider';
import { renderIf } from './../../../lib/util.js';

class CreateSection extends React.Component {
  redirect = () => this.props.handleRedirect(`/${this.props.formType}s`);
  render() {
    let createleague = require('./../assets/createleague.png');
    let creategroup = require('./../assets/creategroup.png');
    let nbalogo = require('./../assets/nba-logo.png');
    let users = require('./../assets/icons/users.icon.svg');

    return (
      <div>
        <div className='createOuterInner'>
          {renderIf(this.props.formType === 'league',
            <div className='outer'>
              <div className='outerLeft'>
                <img src={nbalogo} alt="NBA logo" />
                <p className='headerText'>2018 NBA PLAYOFFS </p>
              </div>
              <div className='outerRight'>
                <p className='seeAll' onClick={this.redirect}>See All</p>
              </div>
            </div>
          )}
          {renderIf(this.props.formType === 'group',
            <div className='outer'>
              <div className='outerLeft'>
              <img className='users' src={users} alt="Users icon" />
                <p className='headerText'>GROUPS </p>
              </div>
              <div className='outerRight'>
                <p className='seeAll' onClick={this.redirect}>See All</p>
              </div>
            </div>
          )}
          <div className='createMain'>
            <div className='createMainWrapper' onClick={this.props.handleCreate}>
              <div className='createMainContent'>
                <div className='createMainBorder'></div>
                <div>
                  <p className='createMainTitle'> Create a {this.props.formType}, and bring your friends! </p>
                  {renderIf(this.props.formType === 'league',
                    <p className='createMainSubtitle'>You&#39;re the League Manager here. Set up a private or public league and play with your family and friends!</p>
                  )}
                  {renderIf(this.props.formType === 'group',
                    <p className='createMainSubtitle'>You&#39;re the leader of the group. Set up a private or public group to cheer on your favorite team with your family and friends!</p>
                  )}
                </div>
              </div>
              <div className='createImgDiv'>
                {renderIf(this.props.formType === 'league',
                  <img className="createImg" src={createleague} alt="Create league icon" />
                )}
                {renderIf(this.props.formType === 'group',
                  <img className="createImg" src={creategroup} alt="Create group icon" />
                )}  
              </div>
            </div>
          </div>
        </div>
        <JoinSection joinType={this.props.formType} handleRedirect={this.props.handleRedirect}/>
        {renderIf(this.props.joinedItems.length > 0,
          <div className='container'>
            <div className='sliderOuter'>
              <div className='sliderOuterWrapper'>
                {this.props.joinedItems.map(joinedItem => {
                  let boundJoinedItemClick = this.props.handlejoinedItemClick.bind(this, joinedItem);
                  return <div className='sliderInnerWrapper' key={joinedItem._id}>
                    <div className='cardOuter' onClick={boundJoinedItemClick}>
                      <Slider joinedItem={joinedItem} formType={this.props.formType} />
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

export default CreateSection;