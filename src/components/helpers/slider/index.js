import React from 'react';

class Slider extends React.Component {
  render() {
    let { joinedItem, formType } = this.props;
    let itemImage = formType === 'league' ? <img className='cardImage' src='https://i.imgur.com/CAoW5n8.jpg' />  : <img className='cardImage' src='https://i.imgur.com/xjGJJvv.jpg' /> ;
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