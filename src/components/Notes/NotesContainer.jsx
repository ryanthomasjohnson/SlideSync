import React from 'react';
// import PropTypes from 'prop-types';
import {
  Editor, EditorState, convertToRaw, convertFromRaw,
} from 'draft-js';
// import { merge } from 'rxjs';
import firebase from '../../firebase';

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.selectionState = null;
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const slidesRef = firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf');
    slidesRef.onSnapshot((slide) => {
      this.setState({ notes: slide.data().notes });
      const rawState = slide.data().notes;
      const contentState = convertFromRaw(rawState);
      let editorState = EditorState.createWithContent(contentState);
      if (this.selectionState !== null) {
        editorState = EditorState.forceSelection(editorState, this.selectionState);
      }
      this.setState({ editorState });
    });
  }

  onChange(editorState) {
    const rawState = convertToRaw(editorState.getCurrentContent());
    const selectionState = editorState.getSelection();
    this.selectionState = selectionState;
    console.log(this.selectionState);

    firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf').set({ notes: rawState }, { merge: true });
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="NotesContainer">
        Notes Container
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>);
  }
}
