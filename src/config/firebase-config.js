import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiczvKojNODjZWkcmHIk5nSCyP6nWVZN8",
  authDomain: "fir-auth-dbcb9.firebaseapp.com",
  databaseURL: "https://fir-auth-dbcb9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-auth-dbcb9",
  storageBucket: "fir-auth-dbcb9.appspot.com",
  messagingSenderId: "282043882078",
  appId: "1:282043882078:web:a4e41cbc742d7c260172cf",
  measurementId: "G-MGM1995Z12"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase;