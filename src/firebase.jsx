import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBv3IZNTOJj3UOZ1lKHMn7MvdkEBHjlkIY',
  authDomain: 'mhacks-219303.firebaseapp.com',
  databaseURL: 'https://mhacks-219303.firebaseio.com',
  projectId: 'mhacks-219303',
  storageBucket: 'mhacks-219303.appspot.com',
  messagingSenderId: '92866787390'
};
firebase.initializeApp(config);

export default firebase;
