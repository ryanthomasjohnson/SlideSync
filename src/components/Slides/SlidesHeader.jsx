import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

export default ({numPages, slidePos, title, handlePrev, handleNext}) => {
  const numPagesClean = numPages === null ? 1 : numPages;
  const slidePosClean = numPages === null ? 0 : slidePos;
  const headerString = `${title} ( ${(slidePosClean + 1)} of ${numPagesClean})`;
  return (
    <Header size="large">
      {headerString}
      <Button
        disabled={slidePosClean === 0}
        onClick={() => { handlePrev(); }}
      >
        Prev
      </Button>
      <Button
        disabled={numPages === null || slidePosClean === numPagesClean - 1}
        onClick={() => { handleNext(); }}
      >
        Next
      </Button>
    </Header>
  );
};
