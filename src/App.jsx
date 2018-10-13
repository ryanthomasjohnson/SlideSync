import React from 'react';

import { Grid } from 'semantic-ui-react';

import NotesContainer from './components/Notes/NotesContainer';
import SlidesContainer from './components/Slides/SlidesContainer';

export default function App() {
  return (
    <div className="App">
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <SlidesContainer />
          </Grid.Column>
          <Grid.Column>
            <NotesContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
