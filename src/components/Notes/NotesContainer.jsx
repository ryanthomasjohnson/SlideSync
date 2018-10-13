import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';

export default class NotesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: 'This is notes'
    };
    // setText = setText.bind(this);
  }

  componentDidMount() {
    const slidesRef = firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf'); //.orderByKey().limitToLast(100);
    slidesRef.onSnapshot((slide) => {
      this.setState({ notes: slide.data().notes });
    });
  }

  setText(event) {
    firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf').set({ 'notes': event.target.value });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="NotesContainer">
        Notes Container
        <textarea rows="4" cols="50" onInput={this.setText} value={notes} />

      </div>);
  }
}

