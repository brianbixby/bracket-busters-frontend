import React from 'react';
import { renderIf } from './../../../lib/util.js';

class Table extends React.Component {
  render() {
    let { item, type } = this.props;
    let itemName = type === 'league' ? item.leagueName : item.groupName;
    let username = type === 'scores' ? item.userID.username : null;
    return (
      <div className='tableRow'>
        {renderIf(type !== 'scores',
          <p>
            <span className='columnNameData columnData'>{itemName} </span>
            <span className='columnCreatorData columnData'>{item.ownerName} </span>
            <span className='columnSizeData columnData'>{item.size} </span>
          </p>
        )}
        {renderIf(type === 'scores',
          <p>
            <span className='columnUserData columnData'>{username} </span>
            <span className='columnScoreData columnData'>{item.score} </span>
          </p>
        )}
      </div>
    );
  }
}

export default Table;
