import React from 'react';

export class LeagueItemScoreBoard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let { scoreBoard } = this.props;
    console.log('this.props.scoreBoard: ', this.props.scoreBoard);
    return ( 
      <div className='scoreBoard-item'>
        <p> {scoreBoard.score} {scoreBoard.userID.username} </p>
      </div>
    );
  }
}

export default LeagueItemScoreBoard;