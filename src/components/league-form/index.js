import React from 'react';
import superagent from 'superagent';
import { isEmail, isAlphanumeric, isAscii } from 'validator';

import Tooltip from '../helpers/tooltip';
import * as util from '../../lib/util';

class LeagueForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.league ? this.props.league : { leagueName: '', scoring: 'regular', poolSize: '', privacy: 'public', password: '', image: '', motto: '',   leagueNameError: null, poolSizeError: null, leagueNameAvailable: true, passwordError: null, error: null, focused: null, submitted: false, };
  }

  componentWillUnmount() {
    this.setState({ leagueName: '', scoring: 'regular', poolSize: '', privacy: 'public', password: '' });
  }

  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      passwordError: this.state.passwordError,
      leagueNameError: this.state.leagueNameError,
    };

    let setError = (name, error) => errors[`${name}Error`] = error;
    let deleteError = name => errors[`${name}Error`] = null;

    if(name === 'leagueName') {
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isAlphanumeric(value))
        setError(name, 'league name can only contain letters and numbers')
      else 
        deleteError(name)
    }

    if(name === 'password') {
      if(!value && input[name='privacy'].value === 'private')
        setError(name, `${name} can not be empty`)
      else if(!isAscii(value))
        setError(name, 'password may only contain normal charachters')
      else 
        deleteError(name)
    }

    this.setState({
      ...errors, error: !!(errors.leagueNameError || errors.passwordError),
    })
  };

  handleFocus = e => this.setState({ focused: e.target.name});

  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused == name ? null : state.focused,
    }))
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({...e});

    this.setState({
      [name]: value,
    });

    if(!this.props.league && name === 'leagueName') {
      this.leagueNameCheckAvailable(value);
    }
  };

  leagueNameCheckAvailable = leagueName => {
    return superagent.get(`${__API_URL__}/api/leagueNames/${leagueName}`)
      .then(() => this.setState({leagueNameAvailable: true }))
      .catch(() => this.setState({ leagueNameAvailable: false }))
  };

  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.error) {
      this.props.onComplete(this.state)
        .catch(err => {
          console.error(err);
          this.setState({ 
            error,
            submitted: true,
        });
      });
    }
    this.setState(state => ({
      submitted: true,
      leagueNameError: state.leagueNameError || state.leagueName ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }))
  };

  render(){
    let { focused, submitted, leagueName, emailError, passwordError, leagueNameError, leagueNameAvailable } = this.state;
    let buttonText = this.props.league ? 'update' : 'create';
    return (
      <form onSubmit={this.handleSubmit} className={util.classToggler({
        'form league-form': true,
        'error': this.state.error && this.state.submitted,
      })}>

        {util.renderIf(this.props.league,
            <h2>update.</h2>
        )}

        {util.renderIf(!this.props.league,
            <h2>create a league.</h2>
        )}

        <input
          className={util.classToggler({error: leagueNameError || !leagueNameAvailable})}
          type='text'
          name='leagueName'
          placeholder='league name'
          value={this.state.leagueName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip message={leagueNameError} show={focused === 'leagueName' || submitted}/>

        {util.renderIf(leagueName,
          <div className='leagueName-availability-outer'>
            <p className='leagueName-availability'>
              {leagueName} {leagueNameAvailable ? 'is available': 'is not available'}
            </p>
          </div>
        )}

        <input
          type='text'
          name='poolSize'
          placeholder='pool size'
          value={this.state.poolSize}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

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
          <p className='labelDesc'>Scoring:</p>
          <div>
            <input 
              type="radio"
              name="scoring" 
              value="regular"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              checked={this.state.scoring === 'regular' ? true : false}
            />
            <label>regular</label>
            <span>If win, you get 10 points.</span>
          </div>

          <div>
            <input 
              type="radio"
              name="scoring" 
              value="underDog"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <label>Under Dog</label>
            <span>If win, you get 20 points.</span>
          </div>
        </div>

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
            <span>Public leagues are open for anyone to join.</span>

          </div>

          <div>
            <input 
              type="radio"
              name="privacy" 
              value="private"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              checked={this.state.privacy === 'private' ? true : false}
            />

            <label>private</label>
            <span>Set up within your office, or a group of family or friends.</span>

          </div>
        </div>

        {util.renderIf(this.state.privacy === 'private',
          <div>
            <input
              className={util.classToggler({passwordError})}
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

export default LeagueForm;