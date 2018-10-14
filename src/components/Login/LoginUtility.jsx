import { firebase } from '../../firebase';

class LoginUtility {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  isLoggedIn() {
    return this.auth.currentUser != null;
  }

  logOut() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getDisplayName() {
    return this.auth.currentUser.displayName;
  }

  getEmail() {
    return this.auth.currentUser.email;
  }

  getPhotoUrl() {
    return this.auth.currentUser.photoURL;
  }

  getUid() {
    return this.auth.currentUser.uid;
  }

  getCreationTime() {
    return this.auth.currentUser.metadata.creationTime;
  }

  getLastSignInTime() {
    return this.auth.currentUser.metadata.lastSignInTime;
  }

  getUserInfo() {
    return this.db.collection('users').doc(this.getUid()).get();
  }

  setUserInfo(info) {
    return this.db.collection('users').doc(this.getUid()).set(info, {merge: true});
  }

  onChange(nextOrObserver, error, completed) {
    return this.auth.onAuthStateChanged(nextOrObserver, error, completed);
  }
}

const loginUtility = new LoginUtility();
export { loginUtility };
