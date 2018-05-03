import React from 'react';
import * as util from '../../../lib/util.js';

class CreateSection extends React.Component {
  render() {
    let muscles = require('./../assets/muscles.png');
    let holla = require('./../assets/holla.png');
    return (
      <div className={`contentOuter component-container${this.props.formType}`}>
        <div className='contentHeaderOuter'>
          <p className='contentHeader'> CREATE A {this.props.formType}!</p>
        </div>
        <div className='contentInner'>
          <div className='row'>
            <div className='col-sm-6'>
              {util.renderIf(this.props.formType === 'league',
                <img className="muscles" src={muscles} />
              )}
              {util.renderIf(this.props.formType === 'group',
                <img className="holla" src={holla} />
              )}  
            </div>
            <div className='col-sm-6'>
              {util.renderIf(this.props.formType === 'league',
                <p>You&#39;re the League Manager here. Set up a private or public league to play with your family and friends!</p>
              )}
              {util.renderIf(this.props.formType === 'group',
                <p>You&#39;re the leader of the group. Set up a private or public group to cheer on your favorite team with your family and friends!</p>
              )}
            </div>
          </div>
        </div>
        <div className='contentFooterOuter'>
          <button className='button create-button' onClick={this.props.handleCreate}>Create {this.props.formType} </button>
        </div>
      </div>
    );
  }
}

export default CreateSection;