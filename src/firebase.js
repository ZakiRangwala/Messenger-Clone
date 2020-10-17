import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // your Firebase credentials go here
  apiKey: "AIzaSyBfFXYHWz7VGfsOAmYvbOdEl_R_Na3HrPI",
  authDomain: "mern-messenger-clone-5d65a.firebaseapp.com",
  databaseURL: "https://mern-messenger-clone-5d65a.firebaseio.com",
  projectId: "mern-messenger-clone-5d65a",
  storageBucket: "mern-messenger-clone-5d65a.appspot.com",
  messagingSenderId: "857509022095",
  appId: "1:857509022095:web:4063e63d5cd59ebe9263fa",
});

const db = firebaseApp.firestore();

export default db;
