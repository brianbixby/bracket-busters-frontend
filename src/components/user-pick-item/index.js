import React from 'react';
import * as util from './../../lib/util.js';

class UserPickItem extends React.Component {
  constructor(props){
    super(props);
    this.state = { _id: props.userPick._id, pick: props.userPick.pick, 
      awayTeamID: props.userPick.gameID.awayTeam._id,
      awayTeamName: props.userPick.gameID.awayTeam.teamName,
      awayTeamWins: props.userPick.gameID.awayTeam.wins,
      awayTeamLosses: props.userPick.gameID.awayTeam.losses,
      homeTeamID: props.userPick.gameID.homeTeam._id,
      homeTeamName: props.userPick.gameID.homeTeam.teamName,
      homeTeamWins: props.userPick.gameID.homeTeam.wins,
      homeTeamLosses: props.userPick.gameID.homeTeam.losses,
      awayTeamCity: props.userPick.gameID.awayTeam.teamCity,
      awayTeamStarPlayer: props.userPick.gameID.awayTeam.starPlayer,
      awayTeamStarPlayerImage: props.userPick.gameID.awayTeam.starPlayerImage,
      awayTeamImage: props.userPick.gameID.awayTeam.image,
      awayTeamColor: props.userPick.gameID.awayTeam.color,
      homeTeamCity: props.userPick.gameID.homeTeam.teamCity,
      homeTeamStarPlayer: props.userPick.gameID.homeTeam.starPlayer,
      homeTeamStarPlayerImage: props.userPick.gameID.homeTeam.starPlayerImage,
      homeTeamImage: props.userPick.gameID.homeTeam.image,
      homeTeamColor: props.userPick.gameID.homeTeam.color,
      editing: false,
    }
  }

  componentWillReceiveProps(props){
    if(props.userPick)
      this.setState(props.userPick)
  }

  awayTeamPickUpdate = team => {
    if(this.state.editing) {
      this.setState({editing: false});
      return this.props.onUpdate({ _id: this.state._id, pick: this.state.awayTeamID });
    }
  };

  homeTeamPickUpdate = team => {
    if(this.state.editing) {
      this.setState({editing: false});
      return this.props.onUpdate({ _id: this.state._id, pick: this.state.homeTeamID });
    }
  };

  handleEdit = () => {
    !this.state.editing ? this.setState({editing: true}) : this.setState({editing: false});
  };
  
  render() {
    let { userPick } = this.props;
    let { editing } = this.state;
    let currentPick = userPick.pick === this.state.homeTeamID ? this.state.homeTeamName : this.state.awayTeamName;

    let gameDetailsStyle = {
      background: `linear-gradient(to right, ${this.state.homeTeamColor}, ${this.state.awayTeamColor})`,
    };
    let homeBorderStyle = {
      background: `${this.state.homeTeamColor}`,
    };
    let awayBorderStyle = {
      background: `${this.state.awayTeamColor}`,
    };
    let homeLogoStyle = {
      background: `url(${this.state.homeTeamImage})`,
    };
    let awayLogoStyle = {
      background: `url(${this.state.awayTeamImage})`,
    };
    return (
<div className='container'>
  <div className='eventDetails gameDetails' style={gameDetailsStyle}>
    <p className='eventNote'> 
      {this.state.awayTeamCity} vs {this.state.homeTeamCity}
    </p>
  </div>
  <div className='gameContent'>
    <div className={this.state.editing ? 'pickHover homeTeamContent' : 'homeTeamContent'}  onClick={this.homeTeamPickUpdate}>
      <div className='teamContainer'>
        <div className='teamContentWrapper'>
          <div className='teamInfo'>
            <div className='teamInfoWrapper'>
              <p className='homeTeamName'>{this.state.homeTeamName}</p>
              <p className='homeTeamRecord'><span>{this.state.homeTeamWins} - {this.state.homeTeamLosses}</span></p>
            </div>
          </div>
          <div className='gameLogoWrapper'>
            <img className='homeTeamLogo gameLogo' src={this.state.homeTeamImage} />
          </div>
        </div>
      </div>
    </div>
    <div className='gameDate'>
      <p className='gameDateP'>{new Date(userPick.gameTime).toDateString()}</p>
    </div>
    <div className={this.state.editing ? 'pickHover awayTeamContent' : 'awayTeamContent'}  onClick={this.awayTeamPickUpdate}>
      <div className='teamContainer'>
        <div className='teamContentWrapper'>
          <div className='gameLogoWrapper'>
            <img className='awayTeamLogo gameLogo' src={this.state.awayTeamImage} />
          </div>
          <div className='teamInfo'>
            <div className='teamInfoWrapper'>
              <p className='awayTeamName'>{this.state.awayTeamName}</p>
              <p className='awayTeamRecord'><span>{this.state.awayTeamWins} - {this.state.awayTeamLosses}</span></p>
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
              <div className={this.state.editing ? 'pickHover playerCardOuter' : 'playerCardOuter'} onClick={this.homeTeamPickUpdate}>
                <div className='playerCardImageWrapper'>
                  <div className='playerImageBackground'></div>
                  <img className='starPlayerImages' src={this.state.homeTeamStarPlayerImage}/>
                  <div className='logoBackground' style={homeLogoStyle}></div>
                  <div className='court'></div>
                </div>
                <div className='playerCardContentBorderTop' style={homeBorderStyle}></div>
                <div className='playerCardNameWrapper'>
                  <p className='starPlayerName'>{this.state.homeTeamStarPlayer}</p>
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
              <div className={this.state.editing ? 'pickHover playerCardOuter' : 'playerCardOuter'} onClick={this.awayTeamPickUpdate}>
                <div className='playerCardImageWrapper'>
                  <div className='playerImageBackground'></div>
                  <img className='starPlayerImages' src={this.state.awayTeamStarPlayerImage}/>
                  <div className='logoBackground' style={awayLogoStyle}></div>
                  <div className='court'></div>
                </div>
                <div className='playerCardContentBorderTop' style={awayBorderStyle}></div>
                <div className='playerCardNameWrapper'>
                  <p className='starPlayerName'>{this.state.awayTeamStarPlayer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className='checkmarkDiv'>
    <p className='gamePick'>current pick: {currentPick}</p>
    <p className='circle' onClick={this.handleEdit}><i className="fa fa-edit"></i></p>
    {/* {util.renderIf(this.state.pick,
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
    )} */}
  </div>
</div>
    );
  }
}

export default UserPickItem;