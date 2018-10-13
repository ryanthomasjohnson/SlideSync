import React from 'react';
import {
  Editor, EditorState, convertToRaw, convertFromRaw, RichUtils,
} from 'draft-js';
import { Container } from 'semantic-ui-react';
import firebase from '../../firebase';
const uuidv4 = require('uuid/v4');

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      slidesRef: firebase.firestore().collection('slides').doc('Lecture 9 - Wang Tiling.pdf'),
      polling: false,
      uid: uuidv4(),
    };
    this.selectionState = null;
    this.onChange = this.onChange.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this.mergeNotes = this.mergeNotes.bind(this);
  }

  componentDidMount() {
    this.state.slidesRef.onSnapshot((slide) => {
      const last_updater = slide.data().last_updater;
      if (last_updater == this.state.uid) {
        return;
      }
      const rawState = slide.data().notes;
      const contentState = convertFromRaw(rawState);
      let editorState = this.state.editorState;
      // editorState.contentState = contentState;
      editorState = EditorState.push(editorState, contentState);
      // let editorState = EditorState.createWithContent(contentState);
      // let editorState = this.state.editorState;
      // editorState.currentContent = contentState;
      if (this.selectionState !== null) {
        editorState = EditorState.forceSelection(editorState, this.selectionState);
      }
      this.setState({ editorState });
    });
  }

  componentWillUpdate() {
    const selectionState = this.state.editorState.getSelection();
    this.selectionState = selectionState;
  }

  onChange(editorState) {
    this.setState({ editorState });
    if (!this.state.polling) {
      this.setState({ polling: true });
      const rawState = convertToRaw(editorState.getCurrentContent());
      this.mergeNotes(rawState);
    }


    // const rawState = convertToRaw(editorState.getCurrentContent());
    // const selectionState = editorState.getSelection();
    // this.selectionState = selectionState;
    // // this.state.slidesRef.set({ cursors: firebase.firestore.FieldValue.arrayUnion("") })
    // this.state.slidesRef.set({ notes: rawState }, { merge: true });
  }

  mergeNotes(rawState) {
    const { slidesRef, uid } = this.state;
    firebase.firestore().runTransaction((transaction) => {
      return transaction.get(slidesRef).then((slide) => {
        transaction.set(slidesRef, { notes: rawState, last_updater: uid }, { merge: true });
      });
    })
      .then(result => this.setState({ polling: false }))
      .catch(err => {
        this.setState({ polling: false });
        console.log(err);
      });
  }

  _onBoldClick() {
    this.setState({ editorState: RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD') });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="NotesContainer">
        <p>Notes Container</p>
        <button onClick={this._onBoldClick}>Bold</button>
        <Container text>
          <Editor editorState={editorState} onChange={this.onChange} />
        </Container>

      </div>);
  }
}
