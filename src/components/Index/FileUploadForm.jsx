import React from 'react';
import { Form, Label, Input, Icon, Button } from 'semantic-ui-react';

import firebase from '../../firebase';

export default class FileUploadForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: ''};
    this.fileUpload = null;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { title } = this.state;
    const { onSubmit } = this.props;
    if (!this.fileUpload) {
      return;
    }
    console.log(this.fileUpload.inputRef);
    console.log(this.fileUpload.inputRef.files);
    const file = this.fileUpload.inputRef.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      onSubmit(title, e.target.result);
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <Form size="small" onSubmit={() => this.handleSubmit()}>
        <Form.Field>
          <Input
            name="title"
            placeholder="Lecture Title"
            type="string"
            label="Lecture Title"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="file"
            type="file"
            label="PDF"
            accept=".pdf"
            ref={ref => { this.fileUpload = ref; }}
          />
        </Form.Field>
        <Form.Button type="submit" float="right">
          Upload
        </Form.Button>
      </Form>
    );
  }
}
