import React from 'react';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import firebase from '../../firebase';

export default class SlidesContainer extends React.Component {

  constructor(props) {
    super(props);
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(this.props.title);
    const storage = firebase.storage();
    this.storageRef = storage.ref('slides/' + this.props.title);
    this.state = {slidePos: 0, pdfUrl: null};
  }

  componentWillMount() {
    this.storageRef.getDownloadURL()
      .then((url) => {
        this.setState({pdfUrl: url});//'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      })
      .catch((err) => {
        console.log(err);
        this.setState({pdfUrl: null});
      });
    this.docRef.onSnapshot((document) => {
      console.log('Setting slidPos to ' + document.data().slide_number);
      this.setState({slidePos: document.data().slide_number});
    });
  }

  setSlidePos(number) {
    this.docRef.set({slide_number: parseInt(number)}, {merge: true})
      .then(() => {
        console.log('Set slidePos to ' + number);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onDocumentLoad(pages) {
    console.log(pages);
  }

  renderPdfDocument() {
    console.log(this.state.pdfUrl);
    if (this.state.pdfUrl === null) {
      return (<div>Retrieving pdf location...</div>);
    }
    return (
      <PDF file={this.state.pdfUrl} onDocumentComplete={this.onDocumentLoad} page={this.state.slidePos + 1} />
    );
  }

  render() {
    return (
      <div className='SlidesContainer'>
        {this.renderPdfDocument()}
        Slides Container POSITION: <input type="number" value={this.state.slidePos} onChange={(e) => {this.setSlidePos(e.target.value)}} />
      </div>);
  }
}
