import React from 'react';
import * as util from '../../../lib/util.js';

class CreateSection extends React.Component {
  render() {
    let muscles = require('./../assets/muscles.png');
    let holla = require('./../assets/holla.png');
    return (
      // <div className={`container component-container${this.props.formType}`}>
      //   <div className='inner-wrapper'>
      //     <p className='header create-header'>Create Your Own {this.props.formType}! </p>

      //     {util.renderIf(this.props.formType === 'league',
      //       <img className="muscles" src={muscles} />
      //     )}
          
      //     <p className='text create-text marginBottom20'>Create a {this.props.formType} of your own, and invite your friends!</p>
      //     {util.renderIf(this.props.formType === 'group',
      //       <img className="holla" src={holla} />
      //     )}  
      //     <button className='button create-button' onClick={this.props.handleCreate}>Create {this.props.formType} </button>
      //   </div>
      // </div>

      <div className={`contentOuter component-container${this.props.formType}`}>
        <div className='contentHeaderOuter'>
          <p className='contentHeader'> Create Your Own {this.props.formType}!</p>
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
              <p>Create a {this.props.formType} of your own, and invite your friends!</p>
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


{/* <div className={`container component-container${this.props.formType}`}>
<div className='inner-wrapper'>
  <p className='header create-header'>Create Your Own {this.props.formType}! </p>

  {util.renderIf(this.props.formType === 'league',
    <img className="muscles" src={muscles} />
  )}
  
  <p className='text create-text marginBottom20'>Create a {this.props.formType} of your own, and invite your friends!</p>
  {util.renderIf(this.props.formType === 'group',
    <img className="holla" src={holla} />
  )}  
  <button className='button create-button' onClick={this.props.handleCreate}>Create {this.props.formType} </button>
</div>
</div> */}