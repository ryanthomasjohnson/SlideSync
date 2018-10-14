import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBv3IZNTOJj3UOZ1lKHMn7MvdkEBHjlkIY',
  authDomain: 'mhacks-219303.firebaseapp.com',
  databaseURL: 'https://mhacks-219303.firebaseio.com',
  projectId: 'mhacks-219303',
  storageBucket: 'mhacks-219303.appspot.com',
  messagingSenderId: '92866787390',
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const FIREBASE_UI_CONFIG = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export {firebase, FIREBASE_UI_CONFIG};

export default firebase;
