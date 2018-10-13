import React from 'react';
import PropTypes from 'prop-types';
import PDF from 'reactjs-pdf';
import { Segment } from 'semantic-ui-react';

import firebase from '../../firebase';
import SlidesHeader from './SlidesHeader';


export default class SlidesContainer extends React.Component {
  constructor(props) {
    super(props);

    const { title } = this.props;
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(title);
    const storage = firebase.storage();
    this.storageRef = storage.ref(`slides/${title}`);
    this.state = {
      slidePos: 0,
      numPages: null,
      pdfUrl: null,
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', () => this.resize());
    this.storageRef.getDownloadURL()
      .then((url) => {
        this.setState({ pdfUrl: url });
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
        this.setState({ pdfUrl: null });
      });
    this.docRef.onSnapshot((document) => {
      this.setState({ slidePos: document.data().slide_number });
    });
  }

  onDocumentLoad(pages) {
    this.setState({ numPages: pages });
  }

  setSlidePos(number) {
    this.docRef.set({ slide_number: number }, { merge: true }).catch((error) => {
      console.log(error); // eslint-disable-line no-console
    });
  }

  resize = () => {
    this.setState({ width: window.innerWidth });
  }

  handleNext() {
    const { slidePos, numPages } = this.state;
    this.setSlidePos(Math.min(slidePos + 1, numPages - 1));
  }

  handlePrev() {
    const { slidePos } = this.state;
    this.setSlidePos(Math.max(slidePos - 1, 0));
  }

  renderPdfDocument() {
    const {
      width,
      pdfUrl,
      numPages,
      slidePos,
    } = this.state;

    const scale = (width / 2) / 792;

    // Don't try and render pdf until we get the url
    if (pdfUrl === null) {
      return (<div>Retrieving pdf location...</div>);
    }
    let pageNum = slidePos;
    // Don't request the page until the document has loaded
    if (numPages === null) {
      pageNum = 0;
    }
    return (
      <PDF
        file={pdfUrl}
        onDocumentComplete={p => this.onDocumentLoad(p)}
        page={pageNum + 1}
        scale={scale}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { slidePos, numPages } = this.state;

    return (
      <div className="SlidesContainer">
        <Segment.Group>
          <SlidesHeader
            title={title}
            slidePos={slidePos}
            numPages={numPages}
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
SlidesContainer.propTypes = {
  title: PropTypes.string.isRequired,
};
