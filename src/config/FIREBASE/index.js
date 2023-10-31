import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/database' 

firebase.initializeApp ({
    apiKey: "AIzaSyBIo-2e6qBbCq6gvR-Wgfy6I-LUw37SFa8",
    authDomain: "smartedu-5p.firebaseapp.com",
    databaseURL: "https://smartedu-5p-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartedu-5p",
    storageBucket: "smartedu-5p.appspot.com",
    messagingSenderId: "942056984674",
    appId: "1:942056984674:web:af0ddd89f8b857ff89413b",
    measurementId: "G-JLLQLVJZYM"
})
const FIREBASE = firebase;

export default FIREBASE;