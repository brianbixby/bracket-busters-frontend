import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import JoinSection from './../joinSection';
import Slider from './../slider';
import Table from './../table';
import * as util from './../../../lib/util.js';

class CreateSection extends React.Component {
  constructor(props){
    super(props);
  }

  redirect = () => this.props.handleRedirect(`/${this.props.formType}s`);

  render() {
    let createleague = require('./../assets/createleague.jpeg');
    let creategroup = require('./../assets/creategroup.jpeg');
    let nbalogo = require('./../assets/nba-logo.png');

    return (
      // <div className='createOuter'>
      <div>
        <div className='createOuterInner'>
          {/* <div className='createHeader'>
            <div className='eventDetails'>
              {util.renderIf(this.props.formType === 'league',
                <p className='eventNote'>2018 NBA PLAYOFFS</p>
              )}
              {util.renderIf(this.props.formType === 'group',
                <p className='eventNote'>GROUP eventNote</p>
              )}
            </div>
            <div className='createHeadline'>
              {util.renderIf(this.props.formType === 'league',
                <p className='contentHeader'>ANOTHER HISTORIC SERIES</p>
              )}
              {util.renderIf(this.props.formType === 'GROUP',
                <p className='contentHeader'>GROUP contentHeader</p>
              )}
            </div>
          </div> */}
          {util.renderIf(this.props.formType === 'league',
            <div className='outer'>
              <div className='outerLeft'>
                <img src={nbalogo} />
                <p className='headerText'>2018 NBA PLAYOFFS </p>
              </div>
              <div className='outerRight'>
                <p className='seeAll' onClick={this.redirect}>all {this.props.formType}s</p>
              </div>
            </div>
          )}
          {util.renderIf(this.props.formType === 'group',
            <div className='outer'>
              <div className='outerLeft'>
                <i className="fa fa-users"></i>
                <p className='headerText'>GROUPS </p>
              </div>
              <div className='outerRight'>
                <p className='seeAll' onClick={this.redirect}>all {this.props.formType}s</p>
              </div>
            </div>
          )}
          <div className='createMain'>
            <div className='createMainWrapper' onClick={this.redirect}>
              <div className='createMainContent'>
                <div className='createMainBorder'></div>
                <div>
                  <p className='createMainTitle'> Create a {this.props.formType}, and bring your friends! </p>
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
                  <img className="createImg" src={createleague} />
                )}
                {util.renderIf(this.props.formType === 'group',
                  <img className="createImg" src={creategroup} />
                )}  
              </div>
            </div>
          </div>
        </div>

        <JoinSection joinType={this.props.formType} handleRedirect={this.props.handleRedirect}/>

        {util.renderIf(this.props.joinedItems.length > 0,
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