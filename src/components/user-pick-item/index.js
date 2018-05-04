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
      editing: false}
  }

  componentWillReceiveProps(props){
    if(props.userPick)
      this.setState(props.userPick)
  }

  awayTeamPickUpdate = team => {
    this.setState({editing: false});
    return this.props.onUpdate({ _id: this.state._id, pick: this.state.awayTeamID });
  };

  homeTeamPickUpdate = team => {
    this.setState({editing: false});
    return this.props.onUpdate({ _id: this.state._id, pick: this.state.homeTeamID });
  };

  handleEdit = () => {
    !this.state.editing ? this.setState({editing: true}) : this.setState({editing: false});
  };
  
  render() {
    let { userPick } = this.props;
    let { editing } = this.state;
    let currentPick = userPick.pick === this.state.homeTeamID ? this.state.homeTeamName : this.state.awayTeamName;
    return (
      <div className='userPickItem'>
        <div className='gawayTeamDiv'>
          {util.renderIf(editing, 
            <button className='teamName teamNameButton' onClick={this.awayTeamPickUpdate}>{this.state.awayTeamName}</button>
          )}
          {util.renderIf(!editing, 
            <span className='teamName teamNameButton'>{this.state.awayTeamName}</span>
          )}
          <p className='teamRecord'>{this.state.awayTeamWins} - {this.state.awayTeamLosses}</p>
        </div>
        <span className='game-dateTime'>{new Date(userPick.gameTime).toDateString()}</span>
        <span className='currentPick'>current pick {currentPick}</span>
        <div className='homeTeamDiv'>
          {util.renderIf(editing, 
            <button className='teamName teamNameButton' onClick={this.homeTeamPickUpdate}>{this.state.homeTeamName}</button>
          )}
          {util.renderIf(!editing, 
            <span className='teamName teamNameButton'>{this.state.homeTeamName}</span>
          )}
          <p className='teamRecord'>{this.state.homeTeamWins} - {this.state.homeTeamLosses}</p>

          <p className='editingButton' onClick={this.handleEdit}><i className="fa fa-edit"></i></p>
        </div>
      </div>
    );
  }
}

export default UserPickItem;