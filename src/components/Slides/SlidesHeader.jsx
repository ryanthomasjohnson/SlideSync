import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Header } from 'semantic-ui-react';

export default ({numPages, slidePos, title, handlePrev, handleNext}) => {
  const numPagesClean = numPages === null ? 1 : numPages;
  const slidePosClean = numPages === null ? 0 : slidePos;
  const headerString = `${title} (${(slidePosClean + 1)} of ${numPagesClean})`;
  return (
    <Segment>
      <Header size="large">
        {headerString}
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
      </Header>
    </Segment>
  );
};
