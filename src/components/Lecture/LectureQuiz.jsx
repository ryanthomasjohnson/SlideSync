import React from 'react';
import PropTypes from 'prop-types';

import { Button, Header, Image, Modal, Form, Radio } from 'semantic-ui-react'

export default function LectureQuiz({ quiz, handleChange, open, handleClose }) {

  let output = '';
  if (quiz.answers) {
    output = quiz.answers.map((answer, index) => (
      <Form.Field key={index}>
        <Radio
          label={answer}
          name='radioGroup'
          value='this'
          checked={quiz.selectedAnswer === index}
          onChange={() => handleChange(index)}
        />
      </Form.Field>
    ));
  }






  return (
    <Modal open={open}>
      <Modal.Header>{quiz.question}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form>
            {output}
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleClose()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

// LectureQuiz.propTypes = {
//   quiz: PropTypes.func.isRequired
// };
