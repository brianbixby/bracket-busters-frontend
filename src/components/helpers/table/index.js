import React from 'react';
import * as util from './../../../lib/util.js';

class Table extends React.Component {
  render() {
    let { item, type } = this.props;
    let itemName = type === 'league' ? item.leagueName : item.groupName;
    return (
      <div className='tableRow'>
        {util.renderIf(type !== 'scores',
          <p>
            <span className='columnNameData'>{itemName} </span>
            <span className='columnCreatorData'>{item.ownerName} </span>
            <span className='columnSizeData'>{item.size} </span>
          </p>
        )}
        {util.renderIf(type === 'scores',
          <p>
            <span className='columnScoreData'>{item.score} </span>
            <span className='columnUserIDData'>{item.userID} </span>
          </p>
        )}
      </div>
    );
  }
}

export default Table;
