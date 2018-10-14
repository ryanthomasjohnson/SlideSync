import React, { Component } from 'react';
// import NameBox from './NameBox.js';
import { Comment, Button, Form, Segment, Divider, Input, Grid } from 'semantic-ui-react';
import Chat from 'twilio-chat';
import { loginUtility } from '../Login/LoginUtility';
const moment = require('moment');

class ChatApp extends Component {
  constructor(props) {
    super(props);
    const name = '';

    const loggedIn = name !== '';
    this.state = {
      name,
      loggedIn,
      token: '',
      chatReady: false,
      messages: [],
      newMessage: ''
    };
    this.channelName = this.props.id;
  }

  componentWillMount = () => {
    if (this.state.loggedIn) {
      this.getToken();
    }
    loginUtility.onChange(() => {
      this.setState({ name: loginUtility.getUid(), loggedIn: true });
      this.getToken();
    });
  };

  onNameChanged = event => {
    this.setState({ name: event.target.value });
  };

  logIn = event => {
    event.preventDefault();
    if (this.state.name !== '') {
      localStorage.setItem('name', this.state.name);
      this.setState({ loggedIn: true }, this.getToken);
    }
  };

  logOut = event => {
    event.preventDefault();
    this.setState({
      name: '',
      loggedIn: false,
      token: '',
      chatReady: false,
      messages: [],
      newMessage: ''
    });
    localStorage.removeItem('name');
    this.chatClient.shutdown();
    this.channel = null;
  };

  getToken = () => {
    const identityValue = encodeURIComponent(this.state.name);
    const url = 'https://us-central1-mhacks-219303.cloudfunctions.net/getToken?identity=' + identityValue
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }

    })
      .then(data => data.json())
      .then(data => {
        this.setState({ token: data.token }, this.initChat);
      });
  };

  initChat = () => {
    this.chatClient = new Chat(this.state.token);
    this.chatClient.initialize().then(this.clientInitiated.bind(this));
  };

  clientInitiated = () => {
    this.setState({ chatReady: true }, () => {
      this.chatClient
        .getChannelByUniqueName(this.channelName)
        .then(channel => {
          if (channel) {
            return (this.channel = channel);
          }
        })
        .catch(err => {
          if (err.body.code === 50300) {
            return this.chatClient.createChannel({
              uniqueName: this.channelName
            });
          }
        })
        .then(channel => {
          this.channel = channel;
          window.channel = channel;
          if (this.channel.state.status !== "joined") {
            return this.channel.join();
          }
          return;

        })
        .then(() => {
          this.channel.getMessages().then(this.messagesLoaded);
          this.channel.on('messageAdded', this.messageAdded);
        });
    });
  };

  messagesLoaded = messagePage => {
    messagePage.items.forEach((message) => {
      loginUtility.getUserInfo(message.author).then((user) => {
        if (user != undefined && user.data() != undefined) {
          message.displayName = user.data().displayName;
          message.photoURL = user.data().photoURL;
          this.forceUpdate();
        }
      });
    });
    this.setState({ messages: messagePage.items.reverse() });
  };

  messageAdded = message => {
    loginUtility.getUserInfo(message.author).then((user) => {
      if (user != undefined && user.data() != undefined) {
        message.displayName = user.data().displayName;
        message.photoURL = user.data().photoURL;
        this.forceUpdate();
      }
    });
    this.setState((prevState, props) => ({
      messages: [message, ...prevState.messages]
    }));
  };

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.channel.sendMessage(message);
  };

  newMessageAdded = li => {
    if (li) {
      li.scrollIntoView();
    }
  };

  render() {
    var loginOrChat;
    const messages = this.state.messages.map((message, index) => {
      return (
        <Segment raised compact size="tiny" key={index}>
          <Comment>
            <Comment.Avatar src={message.photoURL} />
            <Comment.Content>
              <Comment.Author as="a">{message.displayName}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(message.timestamp).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{message.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Segment>
      );
    });
    if (this.state.loggedIn) {
      loginOrChat = (
        <div>
          <Divider />
          <Grid>
            <Grid.Row columns="2">
              <Grid.Column width="4">
                <h2>Chat</h2>
              </Grid.Column>
              <Grid.Column width="12" floated="right">
                <form onSubmit={this.sendMessage}>
                  <Input fluid icon="chevron right" type="text" name="message" id="message" onChange={this.onMessageChanged} value={this.state.newMessage} />
                </form>

              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Comment.Group size="tiny">
            {messages}
          </Comment.Group>

        </div>
      );
    } else {
      loginOrChat = (
        <div>
          {/* <Form>
            <Form.Field onChange={this.onNameChanged}>
              <label>Name</label>
              <input placeholder='Enter Name' />
            </Form.Field>
            <Button type="submit" onClick={this.logIn} >Submit</Button>
          </Form> */}
          {/* <NameBox
            name={this.state.name}
            onNameChanged={this.onNameChanged}
            logIn={this.logIn}
          /> */}
        </div>
      );
    }
    return (
      <div>
        {loginOrChat}
      </div>
    );
  }
}

export default ChatApp;
