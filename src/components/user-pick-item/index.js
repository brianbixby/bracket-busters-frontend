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
      editing: false}
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
    return (
      // <div className='userPickItem'>
      //   <div className='gawayTeamDiv'>
      //     {util.renderIf(editing, 
      //       <button className='teamName teamNameButton' onClick={this.awayTeamPickUpdate}>{this.state.awayTeamName}</button>
      //     )}
      //     {util.renderIf(!editing, 
      //       <span className='teamName teamNameButton'>{this.state.awayTeamName}</span>
      //     )}
      //     <p className='teamRecord'>{this.state.awayTeamWins} - {this.state.awayTeamLosses}</p>
      //   </div>
      //   <span className='game-dateTime'>{new Date(userPick.gameTime).toDateString()}</span>
      //   <span className='currentPick'>current pick {currentPick}</span>
      //   <div className='homeTeamDiv'>
      //     {util.renderIf(editing, 
      //       <button className='teamName teamNameButton' onClick={this.homeTeamPickUpdate}>{this.state.homeTeamName}</button>
      //     )}
      //     {util.renderIf(!editing, 
      //       <span className='teamName teamNameButton'>{this.state.homeTeamName}</span>
      //     )}
      //     <p className='teamRecord'>{this.state.homeTeamWins} - {this.state.homeTeamLosses}</p>

      //     <p className='editingButton' onClick={this.handleEdit}><i className="fa fa-edit"></i></p>
      //   </div>
      // </div>

<div className='container'>
  <div className='eventDetails gameDetails' style={gameDetailsStyle}>
    <p className='eventNote'> 
      {this.state.awayTeamCity} vs {this.state.homeTeamCity}
    </p>
  </div>
  <div className='gameContent'>
    <div className='homeTeamContent'  onClick={this.homeTeamPickUpdate}>
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
    <div className='awayTeamContent' onClick={this.awayTeamPickUpdate}>
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
              <div className='playerCardOuter' onClick={this.homeTeamPickUpdate}>
                <div className='playerCardImageWrapper'>
                  <img className='starPlayerImages' src={this.state.homeTeamStarPlayerImage}/>
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
              <div className='playerCardOuter' onClick={this.awayTeamPickUpdate}>
                <div className='playerCardImageWrapper'>
                  <img className='starPlayerImages' src={this.state.awayTeamStarPlayerImage}/>
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
    <p className='editingButton' onClick={this.handleEdit}><i className="fa fa-edit"></i></p>
    <p className='currentPick'>current pick {currentPick}</p>
  </div>
</div>
    );
  }
}

export default UserPickItem;