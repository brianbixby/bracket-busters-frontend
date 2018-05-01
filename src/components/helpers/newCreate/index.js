import React from 'react';
import NewJoinSection from './../newJoin';
import * as util from '../../../lib/util.js';

class NewCreateSection extends React.Component {
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
      </div>
    );
  }
}

export default NewCreateSection;