import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

export default (props) => {
    const numPages = props.numPages === null ? 1 : props.numPages;
    const slidePos = props.numPages === null ? 0 : props.slidePos;
    const headerString = props.title + ' (' + (slidePos + 1) + ' of ' + numPages + ')';
    return (
        <Header size='large'>
            {headerString}
            <Button 
             disabled={slidePos === 0} 
             onClick={() => {props.handlePrev()}}>
              Prev
            </Button>
            <Button 
             disabled={props.numPages === null || slidePos === numPages - 1}
             onClick={() => {props.handleNext()}}>
              Next
            </Button>
        </Header>
    );
};

