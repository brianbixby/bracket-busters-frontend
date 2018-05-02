import React from 'react';

class Slider extends React.Component {
  render() {
    let { league } = this.props;
    let leagueGeneric = require('./../assets/leagueGeneric.png');
    let leagueImage = league.image ? league.image : leagueGeneric;

    return (
      // <div className='cardOuter'>
      <div className='cardItem'>
        <div className='cardContentWrapper'>
          <div className='cardContentBorderTop'></div>
          <div className='cardContentDiv'>
            <p className='joinTextTitle'>{league.leagueName}</p> 
            <p className='joinTextSubtitle'>{league.motto}</p>
          </div>
        </div>
        <div className='cardImageDiv'>
          <img className='cardImage' src={leagueImage} />
        </div>
      </div>
      // </div>
    );
  }
}

export default Slider;