import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase'

export default class SlidesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {slidePos: 0};
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(this.props.title);
  }

  componentWillMount() {
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

  render() {
    return (
      <div className="SlidesContainer">
        Slides Container POSITION: <input value={this.state.slidePos} onChange={(e) => {this.setSlidePos(e.target.value)}} />
      </div>);
  }
}
