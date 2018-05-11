import React from 'react';
import superagent from 'superagent';

import Tooltip from '../helpers/tooltip';
import * as util from '../../lib/util';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.textAreaHeight = React.createRef();
    this.state = {
      content: '',
      focused: null,
      textAreaHeight: 40,
    };
  }

  componentWillUnmount() {
    this.setState({ content: '', textAreaHeight: 40 });
  }

  handleFocus = e => this.setState({ focused: e.target.name});

  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused == name ? null : state.focused,
    }))
  };

  handleChange = e => {
    let currHeight = this.textAreaHeight.current.scrollHeight;
    if(currHeight > this.state.textAreaHeight) 
      this.setState({ textAreaHeight: currHeight });

    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.content) {
      this.props.onComplete({content: this.state.content })
        .catch(err => console.error(err));
    }
    this.setState({ content: '', textAreaHeight: 40 });
  };

  render() {
    let { focused, content} = this.state;
    let textAreaStyle = {
      height: `${this.state.textAreaHeight}px`,
    };
    return (
      <form onSubmit={this.handleSubmit} className='form comment-form'>
        <div className='photo-div'>
          <img src={this.props.image} />
        </div>
        <div className='commentInput-div'>
          <div className='commentInputWrapper'>
            <textarea
              className='commentInput'
              type='content'
              name='content'
              placeholder='add a comment...'
              value={this.state.content}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={this.textAreaHeight}
              style={textAreaStyle}
            ></textarea>
          </div>
        </div>
        
        {util.renderIf(content,
          <div className='commentFormButtonDiv'>
            <div className='ButtonDiv'>
              <button className='button' type='submit'> post </button>
            </div>
          </div>
        )}
      </form>
    );
  }
}

export default CommentForm;