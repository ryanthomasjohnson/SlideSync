import React from 'react';

import { Grid, Sidebar, Button } from 'semantic-ui-react';

import SlidesContainer from '../Slides/SlidesContainer';
import Editor from '../Editor/Editor';
import Chat from '../Chat/Chat';

export default class LectureContainer extends React.Component {
  slideColRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { match } = this.props;
    const { visible } = this.state;

    return (
      <div className="LectureContainer" style={{ backgroundColor: 'MintCream' }}>
        <Sidebar.Pushable>
          <Sidebar
            animation="overlay"
            icon="labeled"
            onHide={this.handleSidebarHide}
            visible={visible}
            width="wide"
            style={{ backgroundColor: 'MintCream' }}
          >
            <div id="userlist" />
          </Sidebar>
          <Sidebar.Pusher>
            <Grid columns={2} padded>
              <Grid.Row>
                <Grid.Column>
                  <div ref={this.getWidth}>
                    <SlidesContainer id={match.params.id} />
                  </div>
                  <Chat id={match.params.id} />
                </Grid.Column>
                <Grid.Column>
                  <Editor id={match.params.id} showUsers={this.handleButtonClick} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Sidebar.Pusher>

        </Sidebar.Pushable>

      </div>);
  }
}
// LectureContainer.propTypes = {
//   match: PropTypes.match({ title: PropTypes.string });
// }
