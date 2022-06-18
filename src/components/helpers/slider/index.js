import React from 'react';

class Slider extends React.Component {
  render() {
    let { joinedItem, formType } = this.props;
    let kd = require('./../assets/2.png');
    let steph = require('./../assets/1.png');
    let itemImage = formType === 'league' ? <img className='cardImage' src={kd} alt="Kevin Durant" />  : <img className='cardImage' src={steph} alt="Steph Curry" /> ;
    let itemName = formType === 'league' ? joinedItem.leagueName : joinedItem.groupName;
    let itemImageRender = joinedItem.image ? <img className='cardImage' src={joinedItem.image} alt="placeholder" /> : itemImage;
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
          {itemImageRender}
        </div>
      </div>
    );
  }
}

export default Slider;