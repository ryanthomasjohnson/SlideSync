import React from 'react';
import PropTypes from 'prop-types';
import PDF from 'reactjs-pdf';
import { Segment } from 'semantic-ui-react';

import firebase from '../../firebase';
import SlidesHeader from './SlidesHeader';


export default class SlidesContainer extends React.Component {
  constructor(props) {
    super(props);

    const { id } = this.props;
    console.log(id);
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(id);
    const storage = firebase.storage();
    this.storageRef = storage.ref(`slides/${id}`);
    this.state = {
      slidePos: 0,
      numPages: null,
      pdfUrl: null,
      title: '',
    };
  }

  componentWillMount() {
    this.resize();
    window.addEventListener('resize', () => this.timerResize());
    this.storageRef.getDownloadURL()
      .then((url) => {
        this.setState({ pdfUrl: url });
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
        this.setState({ pdfUrl: null });
      });
    this.docRef.onSnapshot((document) => {
      this.setState({ slidePos: document.get('slide_number'), title: document.get('name') });
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
    const scale = ((window.innerWidth - 150) / 2) / 792;
    if (this.pdf) {
      this.pdf.renderOtherPage({
        file: this.pdf.props.file,
        onDocumentComplete: this.pdf.props.onDocumentComplete,
        page: this.pdf.props.page,
        scale,
      });
    }
    this.setState({ pdfScale: scale });
  }

  timerResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resize();
    }, 100);
  }

  handleNext() {
    const { slidePos, numPages } = this.state;
    this.setSlidePos(Math.min(slidePos + 1, numPages - 1));
  }

  handlePrev() {
    const { slidePos } = this.state;
    this.setSlidePos(Math.max(slidePos - 1, 0));
  }

  savePdfRef(pdf) {
    this.pdf = pdf;
  }

  renderPdfDocument() {
    const {
      pdfUrl,
      numPages,
      slidePos,
      pdfScale,
    } = this.state;

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
        ref={(ref) => { this.savePdfRef(ref); }}
        file={pdfUrl}
        onDocumentComplete={p => this.onDocumentLoad(p)}
        page={pageNum + 1}
        scale={pdfScale}
      />
    );
  }

  render() {
    const { slidePos, numPages, title } = this.state;

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
  id: PropTypes.string.isRequired,
};
