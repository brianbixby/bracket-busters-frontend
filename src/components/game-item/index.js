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
    let homeTeamContentStyle = {
      backgroundColor: game.homeTeam.color,
    };
    let awayTeamContentStyle = {
      backgroundColor: game.awayTeam.color,
    };
    return (
      <div className='container'>
        <div className='eventDetails'>
          <p className='gameNote'>
            <span className='homeCity'>{game.homeTeam.teamCity} </span>
            <span className='vs'>vs</span>
            <span className='awayCity'>{game.awayTeam.teamCity}</span>
          </p>
        </div>
        <div className='gameContent'>
          <div className='homeTeamContent' onClick={this.homeTeamPick} style={homeTeamContentStyle}>
            <div className='teamInfo'>
              <p className='homeTeamName'>{game.homeTeam.teamName}</p>
              <p className='homeTeamRecord'>{game.homeTeam.wins} - {game.homeTeam.losses}</p>
            </div>
            <img className='homeTeamLogo gameLogo' src={game.homeTeam.image} />
          </div>
          <div className='gameDate'>
            <p className='gameDateP'>{new Date(game.dateTime).toDateString()}</p>
          </div>
          <div className='awayTeamContent' onClick={this.awayTeamPick} style={awayTeamContentStyle}>
            <img className='awayTeamLogo gameLogo' src={game.awayTeam.image} />
            <div className='teamInfo'>
              <p className='awayTeamName'>{game.awayTeam.teamName}</p>
              <p className='awayTeamRecord'>{game.awayTeam.wins} - {game.awayTeam.losses}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameItem;