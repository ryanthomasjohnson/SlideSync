import React from 'react';
import { Modal } from 'semantic-ui-react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebase, FIREBASE_UI_CONFIG } from '../../firebase';
import { loginUtility } from './LoginUtility';

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: loginUtility.isLoggedIn(),
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      const { onLogin } = this.props;
      if(onLogin) {
        onLogin(user);
      }
      this.setState({signedIn: user != null});
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  renderAuth() {
    const { signedIn } = this.state;
    if (signedIn) {
      return (
        <p>
          You are already signed in as
          { ' ' + loginUtility.getDisplayName() }
          !
        </p>
      );
    }
    return (
      <StyledFirebaseAuth uiConfig={FIREBASE_UI_CONFIG} firebaseAuth={firebase.auth()} />
    );
  }

  render() {
    const { trigger } = this.props;
    return (
      <Modal size="mini" trigger={trigger} dimmer="blurring" closeIcon>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          {this.renderAuth()}
        </Modal.Content>
      </Modal>
    );
  }
}
