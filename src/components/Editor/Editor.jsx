import React, {
  Component
} from 'react';
import './Editor.css';
import firebase from '../../firebase';

class Editor extends Component {
  componentDidMount() {
    // Initialize Firebase.
    // TODO: replace with your Firebase project configuration.
    window.firebase = firebase;
    const firepadRef = this.getExampleRef();
    const codeMirror = window.CodeMirror(document.getElementById('firepad-container'), {
      lineWrapping: true,
    });
    const firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      richTextShortcuts: true,
    });
    firepad.on('ready', function () {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  render() {
    return (
      <div>
        <div id="firepad-container"> </div>
      </div>
    );
  }
}
export default Editor;