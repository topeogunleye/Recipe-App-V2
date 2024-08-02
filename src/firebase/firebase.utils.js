import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDiczvKojNODjZWkcmHIk5nSCyP6nWVZN8',
  authDomain: 'fir-auth-dbcb9.firebaseapp.com',
  databaseURL:
    'https://fir-auth-dbcb9-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fir-auth-dbcb9',
  storageBucket: 'fir-auth-dbcb9.appspot.com',
  messagingSenderId: '282043882078',
  appId: '1:282043882078:web:a4e41cbc742d7c260172cf',
  measurementId: 'G-MGM1995Z12',
};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) {
    // Handle the case when userAuth is falsy
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ propmpt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ propmpt: 'select_account' });
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.setCustomParameters({ propmpt: 'select_account' });
export const signInWithGithub = () => auth.signInWithPopup(githubProvider);

const twitterProvider = new firebase.auth.TwitterAuthProvider();
twitterProvider.setCustomParameters({ propmpt: 'select_account' });
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

export default firebase;
