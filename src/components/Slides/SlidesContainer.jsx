import React from 'react';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import firebase from '../../firebase';
import { Button } from 'semantic-ui-react';

export default class SlidesContainer extends React.Component {

  constructor(props) {
    super(props);
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(this.props.title);
    const storage = firebase.storage();
    this.storageRef = storage.ref('slides/' + this.props.title);
    this.state = {slidePos: 0, numPages: null, pdfUrl: null};
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
    this.docRef.set({slide_number: number}, {merge: true})
      .then(() => {
        console.log('Set slidePos to ' + number);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onDocumentLoad(pages) {
    this.setState({numPages: pages});
  }

  renderPdfDocument() {
    console.log(this.state.pdfUrl);
    console.log(this.state);
    if (this.state.pdfUrl === null) {
      return (<div>Retrieving pdf location...</div>);
    }
    let pageNum = this.state.slidePos;
    if(this.state.numPages === null) {
      pageNum = 0;
    }
    console.log('Requesting page: ' + pageNum);
    return (
      <PDF 
       file={this.state.pdfUrl} 
       onDocumentComplete={(p) => this.onDocumentLoad(p)} 
       page={pageNum + 1} />
    );
  }

  handleNext() {
    this.setSlidePos(Math.min(this.state.slidePos + 1, this.state.numPages - 1));
  }

  handlePrev() {
    this.setSlidePos(Math.max(this.state.slidePos - 1, 0));
  }

  render() {
    return (
      <div className='SlidesContainer'>
        {this.renderPdfDocument()}
        Slide {this.state.slidePos + 1}
        <Button 
         disabled={this.state.slidePos === 0} 
         onClick={() => {this.handlePrev()}}>
          Prev
        </Button>
        <Button 
         disabled={this.state.numPages === null || this.state.slidePos === this.state.numPages - 1}
         onClick={() => {this.handleNext()}}>
          Next
        </Button>
      </div>);
  }
}
