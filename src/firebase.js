import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyBruKiZ7d2v4jZTf_DBFcGssXkbJoley0c",
  authDomain: "chat-me-fe64d.firebaseapp.com",
  databaseURL: "https://chat-me-fe64d.firebaseio.com",
  projectId: "chat-me-fe64d",
  storageBucket: "chat-me-fe64d.appspot.com",
  messagingSenderId: "455416750114"
};
firebase.initializeApp(config);

export default firebase;