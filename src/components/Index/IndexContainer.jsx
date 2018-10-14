import React from 'react';

import { Grid, Message, Header, Icon } from 'semantic-ui-react';

import firebase from '../../firebase';
import IndexMenu from './IndexMenu';
import IndexTable from './IndexTable';

import { loginUtility } from '../Login/LoginUtility';

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    const db = firebase.firestore();
    this.collectionRef = db.collection('slides');

    this.state = {
      lectures: [],
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    this.collectionRef.onSnapshot((snap) => {
      this.setState({
        lectures: snap.docs,
      });
    });
    this.removeObserver = loginUtility.onChange(() => {
      this.setState({ isLoggedIn: loginUtility.isLoggedIn() });
    });
  }

  componentWillUnmount() {
    this.removeObserver();
  }

  render() {
    const { lectures, isLoggedIn } = this.state;

    let error = (
        <Message negative>
          <Message.Header>You are not logged in.</Message.Header>
          <p>Login is required for SlideSync to work properly.</p>
        </Message>
    );

    return (
      <div className="IndexContainer">
        <IndexMenu
          handleLogin={this.handleLogin}
        />
        {!isLoggedIn ? error : ""}
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width={8}>
              <Header as="h1" textAlign='center' style={{ textAlign: 'center', marginTop: '50px' }}>
                <Header.Content>SlideSync</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width={8}>
              <IndexTable lectures={lectures} />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>);
  }
}
