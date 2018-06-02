import React from 'react';

class BannerAd extends React.Component {
  render() {
    return (
      <p className='bannerAd' onClick={()=> window.open('https://www.espn.com', '_blank')}>
        <span className='company'>BUILT BY BIXBY</span>
        <span className='tagLine'>LIFE NEEDS WEBSITES</span>
      </p>
    );
  }
}

export default BannerAd;