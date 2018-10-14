import React from 'react';

import { Grid, Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

import firebase from '../../firebase';
import IndexTable from './IndexTable';
import FileUploadModal from './FileUploadModal';


export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    const db = firebase.firestore();
    this.collectionRef = db.collection('slides');

    this.state = {
      lectures: [],
      menuVisible: false,
    };
  }

  componentDidMount() {
    this.collectionRef.onSnapshot((snap) => {
      this.setState({ lectures: snap.docs });
    });
  }

  render() {
    const { lectures, menuVisible } = this.state;
    const visible = false;

    return (
      <div className="IndexContainer">
        <Sidebar.Pushable style={{height: '100vh'}}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={menuVisible}
            width='thin'
          >
            <Menu.Item as="a" onClick={() => this.setState({ menuVisible: !menuVisible })}>
              <Icon name="chevron left" />
            </Menu.Item>
            <FileUploadModal />
          </Sidebar>

          <Sidebar.Pusher dimmed={menuVisible}>
            <Button secondary icon="bars" onClick={() => this.setState({ menuVisible: !menuVisible })} />

            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column width={8}>
                  <h1 style={{ textAlign: 'center', marginTop: '50px' }}>MHacks XI</h1>
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
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>);
  }
}
