import React from 'react';

import Tooltip from '../helpers/tooltip';
import { classToggler } from '../../lib/util';

class LeagueAllPrivateForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { leagueName: '', password: '',   leagueNameError: null, passwordError: null, error: null, focused: null, submitted: false, };
  }
  componentWillUnmount() {
    this.setState({ leagueName: '', password: '' });
  }
  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      passwordError: this.state.passwordError,
      leagueNameError: this.state.leagueNameError,
    };

    let setError = (name, error) => errors[`${name}Error`] = error;
    let deleteError = name => errors[`${name}Error`] = null;

    if(!value)
      setError(name, `${name} can not be empty`)
    else 
      deleteError(name)

    this.setState({
      ...errors, error: !!(errors.leagueNameError || errors.passwordError),
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
  };
  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.error) {
      this.props.onComplete(this.state);
    }
    this.setState(state => ({
      submitted: true,
      leagueNameError: state.leagueNameError || state.leagueName ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }))
  };
  render(){
    let { focused, submitted, passwordError, leagueNameError } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={classToggler({
        'form page-form all-private-form': true,
        'error': this.state.error && this.state.submitted,
      })}>
        <input
          className={classToggler({error: leagueNameError })}
          type='text'
          name='leagueName'
          placeholder='league name'
          value={this.state.leagueName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip message={leagueNameError} show={focused === 'leagueName' || submitted}/>
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
        <Tooltip message={passwordError} show={focused === 'password' || submitted}/>
        <p className='textRight'><button className='red-button b-button joinPrivate' type='submit'> Join </button></p>
      </form>
    );
  }
}

export default LeagueAllPrivateForm;