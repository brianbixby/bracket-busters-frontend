import React from 'react';
import * as util from './../../lib/util.js';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {gameID: props.game._id, gameTime: props.game.dateTime, pick: '', pickName: '', awayTeam: props.game.awayTeam._id, homeTeam: props.game.homeTeam._id, isHovered: false, isHovered2: false, };
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

  handleHover = () => this.setState({isHovered: !this.state.isHovered});
  handleHover2 = () => this.setState({isHovered2: !this.state.isHovered2});
  
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
          <div className={this.state.isHovered ? 'hovTransform homeTeamContent' : 'homeTeamContent'} onClick={this.homeTeamPick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
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
          <div className={this.state.isHovered2 ? 'hovTransform awayTeamContent' : 'awayTeamContent'} onClick={this.awayTeamPick} onMouseEnter={this.handleHover2} onMouseLeave={this.handleHover2}>
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
                    <div className={this.state.isHovered ? 'hovTransform playerCardOuter' : 'playerCardOuter'} onClick={this.homeTeamPick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                      <div className={this.state.isHovered ? 'hovBackground playerCardImageWrapper' : 'playerCardImageWrapper'}>
                        <img className='starPlayerImages' src={game.homeTeam.starPlayerImage}/>
                        <div className='headerOverlay'></div>
                        <div className='logoBackground'></div>
                        <div className='shadow'></div>
                        <div className='court'></div>
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
                    <div className={this.state.isHovered2 ? 'hovTransform playerCardOuter' : 'playerCardOuter'} onClick={this.awayTeamPick} onMouseEnter={this.handleHover2} onMouseLeave={this.handleHover2}>
                      <div className={this.state.isHovered2 ? 'hovBackground playerCardImageWrapper' : 'playerCardImageWrapper'}>
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
          {util.renderIf(this.state.pick,
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          )}
          <p className={ this.state.pick ? 'gamePick mr50' : 'gamePick' }>current pick: {currPick}</p>
        </div>
      </div>
    );
  }
}

export default GameItem;