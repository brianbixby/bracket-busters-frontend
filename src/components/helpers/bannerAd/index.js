import React from 'react';

class BannerAd extends React.Component {
  render() {
    return (
      <p className='bannerAd' onClick={()=> window.open('http://www.builtbybixby.com', '_blank')}>
        <span className='company'>BUILT BY BIXBY</span>
        <span className='tagLine'>BECAUSE WEBSITES</span>
      </p>
    );
  }
}

export default BannerAd;