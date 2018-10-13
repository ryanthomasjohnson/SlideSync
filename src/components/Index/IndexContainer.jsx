import React from 'react';

import { Grid } from 'semantic-ui-react';

import firebase from '../../firebase';
import IndexTable from './IndexTable';


export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    const db = firebase.firestore();
    this.collectionRef = db.collection('slides');

    this.state = {
      lectures: [],
    };
  }

  componentDidMount() {
    this.collectionRef.get().then((collection) => {
      this.setState({ lectures: collection.docs });
    });
  }

  render() {
    const { lectures } = this.state;

    return (
      <div className="IndexContainer">
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
      </div>);
  }
}
