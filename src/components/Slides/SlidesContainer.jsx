import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import PDF from 'reactjs-pdf';
import { Segment, Button, Header } from 'semantic-ui-react';

import firebase from '../../firebase';
import SlidesHeader from './SlidesHeader';


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
    console.log("WIDTH:", this.props.width);
    console.log(this.state.pdfUrl);
    console.log(this.state);
    // Don't try and render pdf until we get the url
    if (this.state.pdfUrl === null) {
      return (<div>Retrieving pdf location...</div>);
    }
    let pageNum = this.state.slidePos;
    // Don't request the page until the document has loaded
    if(this.state.numPages === null) {
      pageNum = 0;
    }
    console.log('Requesting page: ' + pageNum);
    return (
      <PDF
       file={this.state.pdfUrl}
       onDocumentComplete={(p) => this.onDocumentLoad(p)}
       page={pageNum + 1}
       scale={0.75} />
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
        <Segment.Group>
          <SlidesHeader
            title={this.props.title}
            slidePos={this.state.slidePos}
            numPages={this.state.numPages}
            handlePrev={() => { this.handlePrev(); }}
            handleNext={() => { this.handleNext(); }}
          />
          <Segment>
            {this.renderPdfDocument()}
          </Segment>
        </Segment.Group>
      </div>);
  }
}
