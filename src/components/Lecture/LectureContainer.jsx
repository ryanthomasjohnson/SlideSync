import React from 'react';

import { Grid } from 'semantic-ui-react';

import SlidesContainer from '../Slides/SlidesContainer';
import Editor from '../Editor/Editor';
import Chat from '../Chat/Chat';

export default class LectureContainer extends React.Component {
  slideColRef = React.createRef();

  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const { match } = this.props;

    return (
      <div className="LectureContainer" style={{ backgroundColor: 'MintCream' }}>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column>
              <div ref={this.getWidth}>
                <SlidesContainer id={match.params.id} />
              </div>
              <Chat id={match.params.id} />
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
