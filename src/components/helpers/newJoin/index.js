import React from 'react';
import * as util from './../../../lib/util.js';

class NewJoinSection extends React.Component {
  constructor(props){
    super(props);
  }

  redirect = () => this.props.handleRedirect(`/${this.props.joinType}s`);

  render() {
    let russ = require('./../assets/russ.png');
    let kd = require('./../assets/kd.png');

    return (
      <div className='joinOuter'>
        <div className='joinWrapper' onClick={this.redirect}>
          <div className='joinTextDiv'>
            <div>
              <p className='joinTextTitle'>
                Join a {this.props.joinType}, and invite your friends!
              </p>
              {util.renderIf(this.props.joinType === 'league',
                <p className='joinTextSubtitle'>Take control of the NBA playoffs! Pick the winning teams and earn points based on their real-life performance. Compete with others in your league to be crowned champion.</p>
              )}
              {util.renderIf(this.props.joinType === 'group',
                <p className='joinTextSubtitle'>Get the latest news, insight and predictions! Join a group and get the 411 on latest updates from other die hard fans. Debate, discuss and cheer on your favorite team.</p>
              )}
            </div>
          </div>
          <div className='joinImgDiv'>
            {util.renderIf(this.props.joinType === 'league',
              <img className='joingImg' src={russ} />
            )}
            {util.renderIf(this.props.joinType === 'group',
              <img className='joingImg' src={kd} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewJoinSection;