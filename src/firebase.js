import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCJfaEzYrVbrAupteWdUkzAsfZGODMD_9Y",
    authDomain: "discord-398f7.firebaseapp.com",
    projectId: "discord-398f7",
    storageBucket: "discord-398f7.appspot.com",
    messagingSenderId: "1036372402902",
    appId: "1:1036372402902:web:3c957f6fdb99e0dc75df77",
    measurementId: "G-9TVQFL8V66"
  }; 

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const Googleprovider = new firebase.auth.GoogleAuthProvider();

  export {auth, Googleprovider};
  export default db; 