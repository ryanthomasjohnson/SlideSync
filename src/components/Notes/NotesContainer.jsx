import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';

export default class NotesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: 'Loading notes...',
      cursorPosition: 0
    };
    this.textRef = React.createRef();
    this.setText = this.setText.bind(this);
  }

  componentDidMount() {
    const slidesRef = firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf'); //.orderByKey().limitToLast(100);
    slidesRef.onSnapshot((slide) => {
      this.setState({ notes: slide.data().notes });
    });
  }

  componentDidUpdate() {
    this.textRef.current.selectionEnd = this.state.cursorPosition;
    this.textRef.current.selectionStart = this.state.cursorPosition;
  }

  setText(event) {
    this.setState({ cursorPosition: event.target.selectionEnd });
    firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf').set({ 'notes': event.target.value });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="NotesContainer">
        Notes Container
        <textarea ref={this.textRef} rows="4" cols="50" onInput={this.setText} value={notes} />

      </div>);
  }
}

