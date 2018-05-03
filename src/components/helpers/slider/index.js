import React from 'react';

class Slider extends React.Component {
  render() {
    let { joinedItem, formType } = this.props;
    // let genericImage = require('./../assets/leagueGeneric.png');
    let genericImage = formType === 'league' ? <i className="fa fa-trophy cardImage"></i> : <i className="fa fa-users cardImage"></i>;
    let itemImage = joinedItem.image ? <img className='cardImage' src={joinedItem.image} /> : genericImage;
    let itemName = formType === 'league' ? joinedItem.leagueName : joinedItem.groupName;

    return (
      <div className='cardItem'>
        <div className='cardContentWrapper'>
          <div className='cardContentBorderTop'></div>
          <div className='cardContentDiv'>
            <p className='joinTextTitle'>{itemName}</p> 
            <p className='joinTextSubtitle'>{joinedItem.motto}</p>
          </div>
        </div>
        <div className='cardImageDiv'>
          {itemImage}
        </div>
      </div>
    );
  }
}

export default Slider;