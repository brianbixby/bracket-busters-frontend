import React from 'react';
import * as util from './../../lib/util.js';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {gameID: props.game._id, gameTime: props.game.dateTime, pick: '', pickName: '', awayTeam: props.game.awayTeam._id, homeTeam: props.game.homeTeam._id };
  }

  awayTeamPick = team => {
    if(new Date() < new Date(this.props.game.dateTime)) {
      this.setState({ pick: team, pickName: this.props.game.awayTeam.teamName });
      setTimeout(() => {
        this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.awayTeam})
      }, 5500);
    }
  };

  homeTeamPick = team => {
    if(new Date() < new Date(this.props.game.dateTime)) {
      this.setState({ pick: team, pickName: this.props.game.homeTeam.teamName});
      setTimeout(() => {
        this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.homeTeam})
      }, 5500);
    }
  };



  formatDate = date => {
    let dateArr = new Date(date).toDateString().split(' ');
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };
  
  render() {
    let { game } = this.props;
    let homeLogoStyle = {
      background: `url(${game.homeTeam.image}) no-repeat`,
    }; 
    let awayLogoStyle = {
      background: `url(${game.awayTeam.image}) no-repeat`,
    };
    return (
      <div className={util.classToggler({ 'cardOuter': true, 'fadeout': this.state.pickName, 'locked': new Date() > new Date(game.dateTime) })}>
        <div className={util.classToggler({ 'cardItem': true, 'noPick': !this.state.pick })}>
          <div className='cardWrapper'>
            <div className='homeTeamLogoDiv'></div>
            <div className='homeTeamLogoWrapper' style={homeLogoStyle}></div>
            <div className='homeTeamInfoDiv'>
              <div className='homeTeamInfoWrapper'>
                <p className='cityRec'>{game.homeTeam.teamCity}({game.homeTeam.wins}-{game.homeTeam.losses})</p>
                <p className={util.classToggler({ 'teamName': true, 'picked': this.state.pickName === this.props.game.homeTeam.teamName })}>{game.homeTeam.teamName}</p>
              </div>
            </div>
            <div className='middle'>
              <div>
                <span className='homePick' onClick={this.homeTeamPick}></span>
                <span className='awayPick' onClick={this.awayTeamPick}></span>
              </div>
              <div className='sliderButtonWrapper'>
                {util.renderIf(new Date() < new Date(game.dateTime),
                <p className={util.classToggler({ 'sliderButton': true, 'homeTeamPickButtonState': this.state.pickName === this.props.game.homeTeam.teamName, 'awayTeamPickButtonState': this.state.pickName === this.props.game.awayTeam.teamName })}>
                </p>
                )}
                {util.renderIf(new Date() > new Date(game.dateTime),
                  <div className='lockedPickButton'></div>
                )}
              </div>
            </div>
            <p className='gameTime'>{new Date(game.dateTime).toDateString()}</p>
            <div className='awayTeamInfoDiv'>
              <div className='awayTeamInfoWrapper'>
                <p className='cityRec'>{game.awayTeam.teamCity}({game.awayTeam.wins}-{game.awayTeam.losses})</p>
                <p className={util.classToggler({ 'teamName': true, 'picked': this.state.pickName === this.props.game.awayTeam.teamName })}>{game.awayTeam.teamName}</p>
              </div>
            </div>
            <div className='awayTeamLogoDiv'></div>
            <div className='awayTeamLogoWrapper' style={awayLogoStyle}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameItem;