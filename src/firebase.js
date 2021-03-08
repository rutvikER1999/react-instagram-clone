import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBGf0cTWmQ0zWJ7lN3OWhEq0nTo6DVgRtk",
    authDomain: "instagram-clone-8bdf9.firebaseapp.com",
    projectId: "instagram-clone-8bdf9",
    storageBucket: "instagram-clone-8bdf9.appspot.com",
    messagingSenderId: "791210576229",
    appId: "1:791210576229:web:b0656a0f4378c3d898f98c",
    measurementId: "G-ELRF8BKJC8"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };