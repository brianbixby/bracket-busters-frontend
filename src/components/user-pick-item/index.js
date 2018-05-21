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

  handleEdit = () => !this.state.editing ? this.setState({editing: true}) : this.setState({editing: false});
  
  render() {
    let { userPick } = this.props;
    let { editing } = this.state;
    let currentPick = userPick.pick === this.state.homeTeamID ? this.state.homeTeamName : this.state.awayTeamName;
    let homeLogoStyle = {
      background: `url(${this.state.homeTeamImage}) no-repeat`,
    }; 
    let awayLogoStyle = {
      background: `url(${this.state.awayTeamImage}) no-repeat`,
    };
    return (

      <div className={util.classToggler({ 'cardOuter': true, 'correctPick': userPick.gameID.winner && userPick.gameID.winner === currentPick, 'wrongPick': userPick.gameID.winner && userPick.gameID.winner !== currentPick})}>
        <div className='cardItem'>
          <div className='cardWrapper'>
            <div className='homeTeamLogoDiv'></div>
            <div className='homeTeamLogoWrapper' style={homeLogoStyle}></div>
            <div className='homeTeamInfoDiv'>
              <div className='homeTeamInfoWrapper'>
                <p className='cityRec'>{this.state.homeTeamCity}({this.state.homeTeamWins}-{this.state.homeTeamLosses})</p>
                <p className={util.classToggler({ 'teamName': true, 'picked': currentPick === this.state.homeTeamName, 'notPicked': currentPick !== this.state.homeTeamName })}>{this.state.homeTeamName}</p>
              </div>
            </div>
            <div className='middle'>
              <div>
                <span className='homePick' onClick={this.homeTeamPickUpdate}></span>
                <span className='awayPick' onClick={this.awayTeamPickUpdate}></span>
              </div>
              <div className='sliderButtonWrapper'>
                {util.renderIf(new Date() < new Date(userPick.gameTime),
                  <p className={util.classToggler({ 'sliderButton': true, 'homeTeamPickButtonState ': currentPick === this.state.homeTeamName, 'awayTeamPickButtonState': currentPick === this.state.awayTeamName })}>
                    <span className='homeArrow'>{`< < `}</span> <span className='awayArrow'>> > </span>
                  </p>
                )}
                {util.renderIf(new Date() > new Date(userPick.gameTime) && !userPick.gameID.winner,
                  <div className='lockedPickButton'></div>
                )}
                <div className='correctPickButton'></div>
                <div className='wrongPickButton'></div>
              </div>
            </div>
            <p className='gameTime'>{new Date(userPick.gameTime).toDateString()}</p>
            <div className='awayTeamInfoDiv'>
              <div className='awayTeamInfoWrapper'>
                <p className='cityRec'>{this.state.awayTeamCity}({this.state.awayTeamWins}-{this.state.awayTeamLosses})</p>
                <p className={util.classToggler({ 'teamName': true, 'picked': currentPick === this.state.awayTeamName, 'notPicked': currentPick !== this.state.awayTeamName })}>{this.state.awayTeamName}</p>
              </div>
            </div>
            <div className='awayTeamLogoDiv'></div>
            <div className='awayTeamLogoWrapper' style={awayLogoStyle}></div>
          </div>
        </div>
        <div className='checkmarkDiv'>
          <p className='gamePick'>current pick: {currentPick}</p>
          <p className='circle' onClick={this.handleEdit}><i className="fa fa-edit"></i></p>
        </div>
      </div>
    );
  }
}

export default UserPickItem;

