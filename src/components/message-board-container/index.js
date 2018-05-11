import React from 'react';
import { connect } from 'react-redux';
import CommentForm from '../comment-form';
import CommentItem from '../comment-item';
import { messageBoardFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentCreateRequest, commentFetchRequest, commentsFetchRequest } from '../../actions/comment-actions.js';
import * as util from '../../lib/util.js';


class MessageBoardContainer extends React.Component {
  constructor(props){
    super(props);
  }

  handleComplete = comment => {
    comment.username = this.props.userProfile.username;
    if(this.props.userProfile.image) comment.image = this.props.userProfile.image;
    comment.messageBoardID = this.props.mBoardId;
    return this.props.commentCreate(comment)
      .catch(console.error);
  }

  render(){
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.jpeg');
    let profileImage = this.props.userProfile && this.props.userProfile.image ? this.props.userProfile.image : placeholderImage;
    return (
      <div className='messageBoard-container'>
        <div className='messageBoard-wrapper'>
          <CommentForm onComplete={this.handleComplete} image={profileImage}/>
        </div>
      
        {this.props.comments.map(comment =>
          <div key={comment._id} className='comentOuterDiv'>
            <CommentItem  comment={comment} image={profileImage} />
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentMessageBoard: state.currentMessageBoard,
  comments: state.comments,
});

let mapDispatchToProps = dispatch => ({
  messageBoardFetch: messageBoardID => dispatch(messageBoardFetchRequest(messageBoardFetchRequest)),
  commentCreate: comment => dispatch(commentCreateRequest(comment)),
  commentFetch: commentID => dispatch(commentFetchRequest(commentID)),
  commentsFetch: comments => dispatch(commentsFetchRequest(comments)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoardContainer);