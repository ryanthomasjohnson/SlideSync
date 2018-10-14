import React from 'react';
import { Modal, Button, Header, Image, Icon, Menu } from 'semantic-ui-react';

import firebase from '../../firebase';
import FileUploadForm from './FileUploadForm';

export default class FileUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  uploadFile(title, data) {
    const newFile = {
      name: title,
      slide_number: 0,
    };
    this.db.collection('slides').add(newFile)
      .then((docRef) => {
        const docId = docRef.id;
        this.uploadData(data, docId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadData(data, id) {
    const slidesRef = this.storage.ref('slides').child(id);
    slidesRef.put(data)
      .then(() => {
        console.log('Uploaded slides');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { trigger } = this.props;
    return (
      <Modal size="mini" trigger={trigger} dimmer="blurring" closeIcon>
        <Modal.Header>Upload Lecture</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <FileUploadForm onSubmit={(t, d) => this.uploadFile(t, d)}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
