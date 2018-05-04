import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NewJoinSection from './../newJoin';
import Slider from './../slider';
import * as util from './../../../lib/util.js';

class NewCreateSection extends React.Component {
  render() {
    let muscles = require('./../assets/muscles.png');
    let holla = require('./../assets/holla.png');

    return (
      <div className='createOuter'>
        <div className='createOuterInner' onClick={this.props.handleCreate}>
          <div className='createHeader'>
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

        <NewJoinSection joinType={this.props.joinType} handleRedirect={this.props.handleRedirect}/>

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

        {/* {util.renderIf(this.props.formType === 'group' && this.props.joinedItems.length > 0,
          <div className='container'>
            <div className='sliderOuter'>
              <div className='sliderOuterWrapper'>
                {this.props.joinedItems.map(group => {
                  let boundGroupClick = this.props.hhandlejoinedItemClick.bind(this, group);
                  return <div className='sliderInnerWrapper' key={group._id}>
                    <div className='cardOuter' onClick={boundGroupClick}>
                      <Slider group={group} />
                    </div>
                  </div>;
                })}
              </div>
            </div>
          </div>
        )} */}
      </div>
    );
  }
}

export default NewCreateSection;