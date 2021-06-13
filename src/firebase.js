import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA1foXur_2QMyneWnaYSJIYmpzLsQKULjo",
    authDomain: "unite-d0291.firebaseapp.com",
    projectId: "unite-d0291",
    storageBucket: "unite-d0291.appspot.com",
    messagingSenderId: "815424617565",
    appId: "1:815424617565:web:2014689b3b98a744fe61b4",
    measurementId: "G-5H5V1VJQJP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { db, auth, provider, firebaseApp, storage };