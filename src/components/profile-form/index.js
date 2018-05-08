import React from 'react';
import * as util from './../../lib/util.js';

class ProfileForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.userProfile ? {...props.userProfile} :{
      state: '',
      country: '',
      image: '',
      birthdate: '',
    };
  }
  componentWillReceiveProps(props) {
    if (props.userProfile) this.setState(props.userProfile);
  }

  handleSubmit = e => {
    e.preventDefault();
    return this.props.onComplete(this.state);
  } 

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let dateClass = !this.state.birthdate ? 'grayDate' : '';
    return (
      <section className='profile-form'>
        <form className='form' onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="State" 
            value={this.state.state || ''}
            name="state"
            onChange={this.handleChange}/>
          <input 
            type="text" 
            placeholder="Country"
            value={this.state.country || ''}
            name="country"
            onChange={this.handleChange}/>
          <input 
            type="text" 
            placeholder="img url"
            value={this.state.image || ''}
            name="image"
            onChange={this.handleChange}/>
          <p className='textRight'><button className='red-button b-button' type="submit">Submit</button></p>
        </form>  
      </section>
    );
  }    
}  

export default ProfileForm;