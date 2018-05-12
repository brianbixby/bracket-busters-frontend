import React from 'react';
import { connect } from 'react-redux';
import CommentForm from '../comment-form';
import CommentItem from '../comment-item';
import { messageBoardFetchRequest } from '../../actions/messageBoard-actions.js';
import { commentCreateRequest, commentFetchRequest, commentsFetchRequest } from '../../actions/comment-actions.js';
import Modal from '../helpers/modal';
import * as util from './../../lib/util.js';


class MessageBoardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { launchCommentModal: false };
  }

  componentWillMount() {
    this.props.commentsFetch(this.props.commentsArray)
      .catch(err => util.logError(err));
  }

  componentWillReceiveProps(props) {
    if (props.commentsArray) 
      this.setState({commentCount: props.commentsArray.length});
  }

  componentWillUnmount() {
    this.setState({ launchCommetnModal: false });
  }

  handleComplete = comment => {
    comment.username = this.props.userProfile.username;
    if(this.props.userProfile.image)
      comment.image = this.props.userProfile.image;
    comment.messageBoardID = this.props.mBoardId;
    return this.props.commentCreate(comment)
      .then(() => {
        this.setState(prevState => {
          return {commentCount: prevState.commentCount + 1}
       })
        console.log(this.state.commentCount);
      })
      .catch(console.error);
  };

  // handlelaunchCommentModal = () => this.setState({ launchCommentModal: true });

  // handleShowMore = () => {
  //   console.log(this.state.commentCount);
  //   console.log(this.state.showComments);
  //   this.setState({ showComments: this.state.showComments <= 5 ? this.state.commentCount : 5 });
  //   console.log(this.state.commentCount);
  //   console.log(this.state.showComments);
  // };

  render(){
    let comments = this.props.comments.slice(0, 5)
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.jpeg');
    let profileImage = this.props.userProfile && this.props.userProfile.image ? this.props.userProfile.image : placeholderImage;
    return (
      <div className='wideSectionWrapper messageBoardOuter maxWidth294Big'>
        <div className='outer messageboardHeader'>
          <div className='outerLeft'>
            <i className="fa fa-comments"></i>
            <p className='headerText'>MESSAGE BOARD </p>
          </div>
          <div className='outerRight'>
            <p className='seeAll' onClick={() => this.setState({ launchCommentModal: true })}>See All</p>
          </div>
        </div>
        <div className='messageBoard-container'>
          <div className='messageBoard-wrapper'>
            <CommentForm onComplete={this.handleComplete} image={profileImage}/>
          </div>
          {comments.map(comment =>
            <div key={comment._id} className='comentOuterDiv'>
              <CommentItem  comment={comment} image={profileImage} />
            </div>
          )}
        </div>
        <div className='messageBoardModalContainer'>
          {util.renderIf(this.state.launchCommentModal,
            <Modal heading='MESSAGE BOARD' close={() => this.setState({ launchCommentModal: false })}>
              <div>
                <div className='messageBoard-wrapper'>
                  <CommentForm onComplete={this.handleComplete} image={profileImage}/>
                </div>
                {this.props.comments.map(comment =>
                  <div key={comment._id} className='comentOuterDiv'>
                    <CommentItem  comment={comment} image={profileImage} />
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
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