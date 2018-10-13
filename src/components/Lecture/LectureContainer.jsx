import React from 'react';

import { Grid } from 'semantic-ui-react';

import NotesContainer from '../Notes/NotesContainer';
import SlidesContainer from '../Slides/SlidesContainer';

export default class LectureContainer extends React.Component {
  slideColRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

  getWidth = (element) => {
    if (element) {
      this.setState({ width: element.getBoundingClientRect().width })
    }
  };

  render() {
    const { match } = this.props;
    const { width } = this.state;

    return (
      <div className="LectureContainer">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <div ref={this.getWidth}>
                <SlidesContainer title="Lecture 9 - Wang Tiling.pdf" width={width} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <NotesContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>);
  }
}
// LectureContainer.propTypes = {
//   match: PropTypes.match({ title: PropTypes.string });
// }
