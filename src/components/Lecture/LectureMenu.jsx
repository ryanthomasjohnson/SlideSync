import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Menu } from 'semantic-ui-react';

import LoginModal from '../Login/LoginModal';
import { loginUtility } from '../Login/LoginUtility';

// TODO state can be shifted to container
export default class LectureMenu extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.handleQuiz)

    this.state = {
      isLoggedIn: loginUtility.isLoggedIn(),
      handleQuiz: props.handleQuiz,
      account: {
        photoURL: null,
        displayName: null,
      },
    };
  }

  componentWillMount() {
    this.removeOnChangeObserver = loginUtility.onChange((user) => {
      let url = null;
      let displayName = null;
      console.log(user);
      if (loginUtility.isLoggedIn()) {
        console.log('LOGGED IN');
        url = loginUtility.getPhotoUrl();
        displayName = loginUtility.getDisplayName();
      }
      this.setState({
        isLoggedIn: loginUtility.isLoggedIn(),
        account: {
          photoURL: url,
          displayName: displayName,
        },
      });
    });
  }

  componentWillUnmount() {
    this.removeOnChangeObserver();
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
    const { isLoggedIn, account, handleQuiz } = this.state;
    console.log(this.state);

    let accountMenu = null;
    if (isLoggedIn) {
      const signout = (
        <Menu.Menu position="right">
          <Menu.Item name="signin">
            <Image src={account.photoURL} size="mini" circular />
            &nbsp;&nbsp;
            <a href="/account">
              {account.displayName}
            </a>
          </Menu.Item>
          <Menu.Item name="signin" onClick={this.handleLogout}>
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
      <Menu.Item name="New Quiz" onClick={() => handleQuiz()}>
        New Quiz&nbsp;&nbsp;
        <Icon name="plus circle" />
      </Menu.Item>
    );

    const home = (
      <Menu.Item name="Home">
        <a href='/'>
          <Icon name="home" link/>
        </a>
      </Menu.Item>
    );

    return (
      <div className="IndexMenu">
        <Menu inverted style={{ borderRadius: '0px' }}>
          {home}
          {upload}
          {accountMenu}
        </Menu>
      </div>);
  }

}
