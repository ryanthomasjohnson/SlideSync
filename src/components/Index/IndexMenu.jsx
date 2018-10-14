import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Menu } from 'semantic-ui-react';

import FileUploadModal from './FileUploadModal';
import LoginModal from '../Login/LoginModal';
import { loginUtility } from '../Login/LoginUtility';

export default function IndexMenu() {
  let account = null;
  if (loginUtility.isLoggedIn()) {
    const signout = (
      <Menu.Menu position="right">
        <Menu.Item name="signin">
          <Image src={loginUtility.getPhotoUrl()} size="mini" circular />
          &nbsp;&nbsp;
          {loginUtility.getDisplayName()}
        </Menu.Item>
        <Menu.Item name="signin" onClick={() => loginUtility.logOut()}>
          <Icon name="sign out" />
          Logout
        </Menu.Item>
      </Menu.Menu>);
    account = signout;
  } else {
    loginUtility.getCurrentUser();
    const signin = (
      <Menu.Item position="right" name="signin">
        <Icon name="sign in" />
        Sign in or Register
      </Menu.Item>);
    account = <LoginModal trigger={signin} />;
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
        {account}
      </Menu>
    </div>);
}
IndexMenu.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
