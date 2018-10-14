import React from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Image, Card, Icon } from 'semantic-ui-react';

import firebase from '../../firebase';

import LoginModal from '../Login/LoginModal';
import { loginUtility } from '../Login/LoginUtility';
import AccountMenu from './AccountMenu';


export default class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: loginUtility.isLoggedIn(),
      isProfessor: false,
    };
  }

  componentWillMount() {
    this.removeOnChangeObserver = loginUtility.onChange(() => {
      if (!loginUtility.isLoggedIn()) {
        this.setState({isLoggedIn: false});
      }
      loginUtility.getUserInfo()
        .then((info) => {
          this.setState({ isProfessor: info.get('is_professor') });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(loginUtility.isLoggedIn());
      this.setState({isLoggedIn: true});
    });
  }

  componentWillUnmount() {
    this.removeOnChangeObserver();
  }

  renderNotLoggedIn() {

    const loginNow = (
      <Button>Login Now</Button>
    );
    return (
        <div className="AccountContainer">
        <AccountMenu
          handleLogin={this.handleLogin}
        />
          <Message negative size="big" floating>
            <Message.Header>You aren't logged in!</Message.Header>
            <LoginModal trigger={loginNow} />
          </Message>
        </div>
    );
  }

  toggleProfessor() {
    const { isProfessor } = this.state;
    loginUtility.setUserInfo({is_professor: !isProfessor})
      .catch((err) => {
        console.log(err);
      });
    this.setState({isProfessor: !isProfessor});
  }

  renderLoggedIn() {
    const { isProfessor } = this.state;
    return (
      <div className="AccountContainer">
      <AccountMenu
          handleLogin={this.handleLogin}
        />
        <Card centered>
          <Image src={loginUtility.getPhotoUrl()} />
          <Card.Content>
            <Card.Header>{loginUtility.getDisplayName()}</Card.Header>
            <Card.Meta>
              <span>
                {'Joined on ' + loginUtility.getCreationTime()}
              </span>
            </Card.Meta>
            <Button toggle active={isProfessor} onClick={() => { this.toggleProfessor() }}>
              {isProfessor ? 'Professor' : 'Student'}
            </Button>
          </Card.Content>
          <Card.Content extra>
            {loginUtility.getEmail()}
          </Card.Content>
        </Card>
      </div>
    );
  }

  render() {
    const { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      return this.renderNotLoggedIn();
    } else {
      return this.renderLoggedIn();
    }
  }
}
