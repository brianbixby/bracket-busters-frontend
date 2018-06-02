import React from 'react';

export class CommentItem extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let { comment, image } = this.props;
    return ( 
      <div className='comment-item'>
        <div className='comment-photo-div'>
          <img src={image} />
        </div>
        <div className='comment-text-div'>
          <div className='comment-commenter'> {comment.username} </div>
          <div className='comment-content'>{comment.content}</div>
        </div>
      </div>
    );
  }
}

export default CommentItem;