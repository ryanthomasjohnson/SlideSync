import React from 'react';

import { Grid } from 'semantic-ui-react';

import NotesContainer from '../Notes/NotesContainer';
import SlidesContainer from '../Slides/SlidesContainer';
import Editor from '../Editor/Editor';

export default class LectureContainer extends React.Component {
  slideColRef = React.createRef();

  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const { match } = this.props;

    return (
      <div className="LectureContainer">
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column>
              <div ref={this.getWidth}>
                <SlidesContainer id={match.params.id} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Editor id={match.params.id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>);
  }
}
// LectureContainer.propTypes = {
//   match: PropTypes.match({ title: PropTypes.string });
// }
