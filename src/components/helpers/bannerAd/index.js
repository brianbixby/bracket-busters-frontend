import React from 'react';

class BannerAd extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <p className='bannerAd' onClick={()=> window.open('https://www.espn.com', '_blank')}>text</p>
    );
  }
}

export default BannerAd;