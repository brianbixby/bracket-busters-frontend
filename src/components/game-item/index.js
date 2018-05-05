import React from 'react';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {gameID: props.game._id, gameTime: props.game.dateTime, pick: '', awayTeam: props.game.awayTeam._id, homeTeam: props.game.homeTeam._id};
  }

  awayTeamPick = team => {
    this.setState({ pick: team });
    return this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.awayTeam});
  };

  homeTeamPick = team => {
    return this.props.onComplete({gameID: this.state.gameID, gameTime: this.state.gameTime, pick: this.state.homeTeam});
  };
  
  render() {
    let { game } = this.props;
    let gameDetailsStyle = {
      background: `linear-gradient(to right, ${game.homeTeam.color}, ${game.awayTeam.color})`,
    }
    return (
      <div className='container'>
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
                    <div className='playerCardOuter'>
                      <div className='playerCardImageWrapper'>
                        <img className='starPlayerImages' src={game.homeTeam.starPlayerImage}/>
                      </div>
                      <div className='playerCardContentBorderTop'></div>
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
                    <div className='playerCardOuter'>
                      <div className='playerCardImageWrapper'>
                        <img className='starPlayerImages' src={game.awayTeam.starPlayerImage}/>
                      </div>
                      <div className='playerCardContentBorderTop'></div>
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
      </div>
    );
  }
}

export default GameItem;