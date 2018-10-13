import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { merge } from 'rxjs';

export default class NotesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: 'Loading notes...',
      editorState: EditorState.createEmpty(),
      cursorPosition: 0
    };
    this.selectionState = null;
    this.textRef = React.createRef();
    this.setText = this.setText.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const slidesRef = firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf'); //.orderByKey().limitToLast(100);
    slidesRef.onSnapshot((slide) => {
      this.setState({ notes: slide.data().notes });
      let rawState = slide.data().notes;
      let contentState = convertFromRaw(rawState);
      let editorState = EditorState.createWithContent(contentState);
      if (this.selectionState !== null) {
        editorState = EditorState.forceSelection(editorState, this.selectionState)
      }
      this.setState({ editorState });
    });
  }

  componentDidUpdate() {
    this.textRef.current.selectionEnd = this.state.cursorPosition;
    this.textRef.current.selectionStart = this.state.cursorPosition;
  }

  onChange(editorState) {
    let rawState = convertToRaw(editorState.getCurrentContent());
    let selectionState = editorState.getSelection();
    this.selectionState = selectionState;

    firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf').set({ notes: rawState }, { merge: true });
    this.setState({ editorState });
  }

  setText(event) {
    this.setState({ cursorPosition: event.target.selectionEnd });
    firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf').set({ notes: event.target.value }, { merge: true });
  }



  render() {
    const { notes, editorState } = this.state;
    return (
      <div className="NotesContainer">
        Notes Container
        <textarea ref={this.textRef} rows="4" cols="50" onInput={this.setText} value={notes} />
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>);
  }
}

