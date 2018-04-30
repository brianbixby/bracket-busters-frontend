import React from 'react';
import { connect } from 'react-redux';
import * as util from '../../lib/util.js';

class Footer extends React.Component {
  constructor(props){
    super(props);
    this.state={hidden: false};
  }

  componentWillMount() {
    this.tokenCheck();
  }

  tokenCheck = () => {
    if(!this.props.userAuth) {
      let token;
      process.env.NODE_ENV === 'production' ? token = readCookie('Bracket-Busters-Token') : token = localStorage.token;  
      if(!token) this.setState({ intro: true })
    }
    else {
      this.setState({ introFooter: false })
    }
  }

  render() {
    return (
      <footer className={util.classToggler({ 'footer': true, 'introFooter': !this.props.userAuth })}>
        <p>Brian Bixby: 
          <a href="https://github.com/brianbixby" rel="noopener noreferrer" target="_blank"><span><i className="fa fa-github"></i></span> </a>
          <a href="https://www.linkedin.com/in/brianbixby1/" rel="noopener noreferrer" target="_blank"><span><i className="fa fa-linkedin"></i></span></a>
        </p>
      </footer>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
});

export default connect(mapStateToProps, null)(Footer);