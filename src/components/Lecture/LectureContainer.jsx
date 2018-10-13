import React from 'react';

import { Grid } from 'semantic-ui-react';

import NotesContainer from '../Notes/NotesContainer';
import SlidesContainer from '../Slides/SlidesContainer';

export default function LectureContainer({ match }) {
  return (
    <div className="LectureContainer">
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <SlidesContainer title={match.params.title} />
          </Grid.Column>
          <Grid.Column>
            <NotesContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>);
}
// LectureContainer.propTypes = {
//   match: PropTypes.match({ title: PropTypes.string });
// }
