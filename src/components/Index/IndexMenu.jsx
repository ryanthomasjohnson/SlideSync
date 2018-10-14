import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Menu } from 'semantic-ui-react';

import FileUploadModal from './FileUploadModal';
import LoginModal from '../Login/LoginModal';
import { loginUtility } from '../Login/LoginUtility';

// TODO state can be shifted to container
export default class IndexMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      account: {
        photoURL: null,
        displayName: null,
      },
    };
  }

  componentDidMount() {
    if (loginUtility.isLoggedIn()) {
      this.setState({
        isLoggedIn: true,
        account: {
          photoURL: loginUtility.getPhotoUrl(),
          displayName: loginUtility.getDisplayName(),
        },
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  handleLogout = () => {
    loginUtility.logOut().then(() => {
      this.setState({ isLoggedIn: loginUtility.isLoggedIn() });
    });
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: loginUtility.isLoggedIn() });
  }

  render() {
    const { isLoggedIn, account } = this.state;

    let accountMenu = null;
    if (isLoggedIn) {
      const signout = (
        <Menu.Menu position="right">
          <Menu.Item name="signin">
            <Image src={account.photoURL} size="mini" circular />
            &nbsp;&nbsp;
            {account.displayName}
          </Menu.Item>
          <Menu.Item name="signin" onClick={this.handleLogout()}>
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        </Menu.Menu>);
      accountMenu = signout;
    } else {
      loginUtility.getCurrentUser();
      const signin = (
        <Menu.Item position="right" name="signin">
          <Icon name="sign in" />
          Sign in or Register
        </Menu.Item>);
      accountMenu = <LoginModal trigger={signin} onLogin={this.handleLogin} />;
    }

    const upload = (
      <Menu.Item name="New Lecture">
        New Lecture&nbsp;&nbsp;
        <Icon name="plus circle" />
      </Menu.Item>
    );

    return (
      <div className="IndexMenu">
        <Menu inverted style={{ borderRadius: '0px' }}>
          <FileUploadModal trigger={upload} />
          {accountMenu}
        </Menu>
      </div>);
  }

}
