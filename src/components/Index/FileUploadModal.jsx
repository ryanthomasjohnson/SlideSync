import React from 'react';
import { Modal, Button, Header, Image, Icon, Menu } from 'semantic-ui-react';

import firebase from '../../firebase';
import FileUploadForm from './FileUploadForm';

export default class FileUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  toggleOpen() {
    this.setState(state => ({ open: !state.open }));
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
    const { open } = this.state;
    const menuItem = (
      <Menu.Item as="a" onClick={() => this.toggleOpen()}>
        <Icon name="upload" />
        New Lecture
      </Menu.Item>
    );
    return (
      <Modal size="mini" open={open} trigger={menuItem} dimmer="blurring" onClose={() => this.toggleOpen()}>
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
