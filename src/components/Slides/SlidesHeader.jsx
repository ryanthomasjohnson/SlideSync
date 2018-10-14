import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Header } from 'semantic-ui-react';
import { loginUtility } from '../Login/LoginUtility';

export default class SlidesHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { is_professor: false };
  }

  componentWillMount() {
    this.removeObserver = loginUtility.onChange(() => {
      loginUtility.getUserInfo()
        .then((info) => {
          this.setState({ is_professor: info.get('is_professor')});
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  componentWillUnmount() {
    this.removeObserver();
  }

  render() {
    const {numPages, slidePos, title, handlePrev, handleNext} = this.props;
    const { is_professor } = this.state;
    const numPagesClean = numPages === null ? 1 : numPages;
    const slidePosClean = numPages === null ? 0 : slidePos;
    const headerString = `${title} (${(slidePosClean + 1)} of ${numPagesClean})`;
    const buttons = (
      <Button.Group floated="right">
        <Button color="red"
          disabled={slidePosClean === 0}
          onClick={() => { handlePrev(); }}
        >
          Prev
        </Button>
        <Button color="blue"
          disabled={numPages === null || slidePosClean === numPagesClean - 1}
          onClick={() => { handleNext(); }}
        >
          Next
        </Button>
      </Button.Group>
    );
    return (
      <Segment>
        <Header size="large">
          {headerString}
          {is_professor ? buttons : ""}
        </Header>
      </Segment>
    );
  }
};
