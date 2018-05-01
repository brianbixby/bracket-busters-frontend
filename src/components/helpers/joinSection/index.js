import React from 'react';
import { Link } from 'react-router-dom';
import * as util from './../../../lib/util.js';

class JoinSection extends React.Component {
  render() {
    let russ = require('./../assets/russ.png');
    let kd = require('./../assets/kd.png');

    return (
      <div className={`contentOuter component-container${this.props.joinType}`}>
        <div className='contentHeaderOuter'>
          {util.renderIf(!this.props.alreadyJoined && !this.props.joinedAlready,
            <div>
              {util.renderIf(this.props.joinType === 'league',
                <img className='russ' src={russ} />
              )}
              {util.renderIf(this.props.joinType === 'group',
                <img className='kd' src={kd} />
              )}
              <p className='contentHeader'>Join a {this.props.joinType}, and invite your friends!</p>
            </div>
          )}
          {util.renderIf(this.props.alreadyJoined || this.props.joinedAlready,
            <p className='contentHeader'>Be cool and join another {this.props.joinType}, and invite your friends!</p>
          )}
        </div>
        <div className='contentInner'>
          <div className='row'>
            <div className='col-sm-12'>
              {util.renderIf(this.props.alreadyJoined || this.props.joinedAlready,
                <div>
                  <div className='usersLeagueAndGroups'>
                    {util.renderIf(this.props.alreadyJoined,
                      <img className='russ' src={russ} />
                    )}
                    {util.renderIf(this.props.joinedAlready,
                      <img className='kd' src={kd} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='contentFooterOuter'>
          {/* <button className='button create-button'><Link to={`/${this.props.joinType}s`}>Join {this.props.joinType}</Link> </button> */}
          <Link className='button create-button' to={`/${this.props.joinType}s`}>Join {this.props.joinType}</Link>
        </div>
      </div>
    );
  }
}

export default JoinSection;