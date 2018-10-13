import React from 'react';

import { Grid } from 'semantic-ui-react';

import IndexTable from './IndexTable';


export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: [
        'Wang Tiling',
        'Cook-Levin Theorem',
      ],
    };
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
