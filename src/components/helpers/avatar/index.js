import React from 'react';

const Avatar = props => (
  <div className='avatar'>
    <img src={props.url} alt="user avatar" /> 
  </div>
);

export default Avatar;