import React from 'react';
import superagent from 'superagent';
import { isAscii } from 'validator';

import Tooltip from '../helpers/tooltip';
import { classToggler, renderIf } from '../../lib/util';

class GroupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.group ? this.props.group : { groupName: '', privacy: 'public', motto: '', image: '', password: '', groupNameError: null, groupNameAvailable: true, passwordError: null, error: null, focused: null, submitted: false, };
  }
  componentWillUnmount() {
    this.setState({ groupName: '', privacy: 'public', motto: '', image: '', password: '', tags: '' });
  }
  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      passwordError: this.state.passwordError,
      groupNameError: this.state.groupNameError,
    };

    let setError = (name, error) => errors[`${name}Error`] = error;
    let deleteError = name => errors[`${name}Error`] = null;

    if(name === 'groupName') {
      if(!value)
        setError(name, `${name} can not be empty`)
      else 
        deleteError(name)
    }

    if(name === 'password') {
      if(!value && this.state.privacy === 'private')
        setError(name, `${name} can not be empty`);
      else if(!isAscii(value))
        setError(name, 'password may only contain normal charachters');
      else 
        deleteError(name);
    }

    this.setState({
      ...errors, error: !!(errors.groupNameError || errors.passwordError),
    })
  };
  handleFocus = e => this.setState({ focused: e.target.name});
  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused === name ? null : state.focused,
    }))
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({...e});

    this.setState({
      [name]: value,
    });

    if(this.props.group && name === 'groupName') {
      this.groupNameCheckAvailable(value);
    }
  };
  groupNameCheckAvailable = groupName => {
    return superagent.get(`${process.env.REACT_APP_API_URL}/api/groupNames/${groupName}`)
      .then(() => this.setState({groupNameAvailable: true }))
      .catch(() => this.setState({ groupNameAvailable: false }))
  };
  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.error) {
      this.props.onComplete(this.state)
        .catch(err => {
          console.error(err);
          this.setState({ 
            error: true,
            submitted: true,
        });
      });
    }
    this.setState(state => ({
      submitted: true,
      groupNameError: state.groupNameError || state.groupName ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }))
  };
  render(){
    let { focused, submitted, groupName, passwordError, groupNameError, groupNameAvailable } = this.state;
    let buttonText = this.props.group ? 'update' : 'create';
    return (
      <form onSubmit={this.handleSubmit} className={classToggler({
        'form group-form': true,
        'error': this.state.error && this.state.submitted,
      })}>
        {renderIf(this.props.group,
            <h2>update.</h2>
        )}
        {renderIf(!this.props.group,
            <h2>create a group.</h2>
        )}
        <input
          className={classToggler({error: groupNameError || !groupNameAvailable})}
          type='text'
          name='groupName'
          placeholder='group name'
          value={this.state.groupName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip message={groupNameError} show={focused === 'groupName' || submitted}/>
        {renderIf(groupName,
          <div className='groupName-availability-outer'>
            <p className='groupName-availability'>
              {groupName} {groupNameAvailable ? 'is available': 'is not available'}
            </p>
          </div>
        )}
        <input
          type='text'
          name='image'
          placeholder='image url'
          value={this.state.image}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <input
          type='text'
          name='motto'
          placeholder='brief description'
          value={this.state.motto}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className='radio-div'>
          <p className='labelDesc'>Privacy:</p>
          <div>
            <input 
              type="radio"
              name="privacy" 
              value="public"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              checked={this.state.privacy === 'public' ? true : false}
            />
            <label>public</label>
            <span>Public groups are open for anyone to join.</span>
          </div>
          <div className="radioPri">
            <input 
              type="radio"
              name="privacy" 
              value="private"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <label>private</label>
            <span>Set up within your office, or a group of family or friends.</span>
          </div>
        </div>
        {renderIf(this.state.privacy === 'private',
          <div>
            <input
              className={classToggler({passwordError})}
              type='password'
              name='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <Tooltip message={passwordError} show={ focused === 'password' || submitted}/>
          </div>
        )}
        <p className='textRight'><button className='red-button b-button' type='submit'> {buttonText} </button></p>
      </form>
    );
  }
}

export default GroupForm;