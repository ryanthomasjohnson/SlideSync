import { firebase } from '../../firebase';

class LoginUtility {
  constructor() {
    this.auth = firebase.auth();
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
}

const loginUtility = new LoginUtility();

export { loginUtility };
