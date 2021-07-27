import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDd9V7KTLxLpMPsZarMzQ3_NjHhjgeGqW0",
    authDomain: "react2021-10da0.firebaseapp.com",
    projectId: "react2021-10da0",
    storageBucket: "react2021-10da0.appspot.com",
    messagingSenderId: "422680374262",
    appId: "1:422680374262:web:b719afcc3af19e4efcf5d7",
    measurementId: "G-D9M07DJCL5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.db = firebase.firestore();
firebase.authentication = firebase.auth();
export default firebase;