import React from 'react';
import * as util from './../../lib/util.js';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {gameID: props.game._id, gameTime: props.game.dateTime, pick: '', pickName: '', awayTeam: props.game.awayTeam._id, homeTeam: props.game.homeTeam._id};
  }

  awayTeamPick = team => {
    this.setState({ pick: team, pickName: this.props.game.awayTeam.teamName });
    setTimeout(() => {
      this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.awayTeam})
    }, 2500);
  };

  homeTeamPick = team => {
    this.setState({ pick: team, pickName: this.props.game.homeTeam.teamName});
    setTimeout(() => {
      this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.homeTeam})
    }, 2500);
  };
  
  render() {
    let { game } = this.props;
    let gameDetailsStyle = {
      background: `linear-gradient(to right, ${game.homeTeam.color}, ${game.awayTeam.color})`,
    };
    let homeBorderStyle = {
      background: `${game.homeTeam.color}`,
    };
    let awayBorderStyle = {
      background: `${game.awayTeam.color}`,
    };
    let currPick = this.state.pickName ? this.state.pickName : 'Not Picked';
    return (
      <div className={ this.state.pickName ? 'container fadeout' : 'container' }>
        <div className='eventDetails gameDetails' style={gameDetailsStyle}>
          <p className='eventNote'> 
            {game.homeTeam.teamCity} vs {game.awayTeam.teamCity}
          </p>
        </div>
        <div className='gameContent'>
          <div className='homeTeamContent' onClick={this.homeTeamPick}>
            <div className='teamContainer'>
              <div className='teamContentWrapper'>
                <div className='teamInfo'>
                  <div className='teamInfoWrapper'>
                    <p className='homeTeamName'>{game.homeTeam.teamName}</p>
                    <p className='homeTeamRecord'><span>{game.homeTeam.wins} - {game.homeTeam.losses}</span></p>
                  </div>
                </div>
                <div className='gameLogoWrapper'>
                  <img className='homeTeamLogo gameLogo' src={game.homeTeam.image} />
                </div>
              </div>
            </div>
          </div>
          <div className='gameDate'>
            <p className='gameDateP'>{new Date(game.dateTime).toDateString()}</p>
          </div>
          <div className='awayTeamContent' onClick={this.awayTeamPick}>
            <div className='teamContainer'>
              <div className='teamContentWrapper'>
                <div className='gameLogoWrapper'>
                  <img className='awayTeamLogo gameLogo' src={game.awayTeam.image} />
                </div>
                <div className='teamInfo'>
                  <div className='teamInfoWrapper'>
                    <p className='awayTeamName'>{game.awayTeam.teamName}</p>
                    <p className='awayTeamRecord'><span>{game.awayTeam.wins} - {game.awayTeam.losses}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='createMain'>
          <div className='createMainWrapper playerDiv'>
            <div className='createImgDiv'>
              <div className='starPlayerImageDiv homeStarPlayerImageDiv'>
                <div className='starPlayerImageDivWrapper'>
                  <div className='starPlayerImageDivInnerWrapper'>
                    <div className='playerCardOuter' onClick={this.homeTeamPick}>
                      <div className='playerCardImageWrapper'>
                        <img className='starPlayerImages' src={game.homeTeam.starPlayerImage}/>
                      </div>
                      <div className='playerCardContentBorderTop' style={homeBorderStyle}></div>
                      <div className='playerCardNameWrapper'>
                        <p className='starPlayerName'>{game.homeTeam.starPlayer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='vsDiv'>
                <p className='vs'>vs</p>
              </div>
              <div className='starPlayerImageDiv awayStarPlayerImageDiv'>
                <div className='starPlayerImageDivWrapper'>
                  <div className='starPlayerImageDivInnerWrapper'>
                    <div className='playerCardOuter' onClick={this.awayTeamPick}>
                      <div className='playerCardImageWrapper'>
                        <img className='starPlayerImages' src={game.awayTeam.starPlayerImage}/>
                      </div>
                      <div className='playerCardContentBorderTop' style={awayBorderStyle}></div>
                      <div className='playerCardNameWrapper'>
                        <p className='starPlayerName'>{game.awayTeam.starPlayer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='checkmarkDiv'>
          <p className='gamePick'>current pick: {currPick}</p>
          {util.renderIf(this.state.pick,
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          )}
        </div>
      </div>
    );
  }
}

export default GameItem;