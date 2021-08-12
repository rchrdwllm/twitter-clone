import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
    apiKey: "AIzaSyArTswZZ8--BX0j6Q9Ro1S9hUoV0mMT5xQ",
    authDomain: "twitter-clone-ts.firebaseapp.com",
    projectId: "twitter-clone-ts",
    storageBucket: "twitter-clone-ts.appspot.com",
    messagingSenderId: "578298755685",
    appId: "1:578298755685:web:a77828b6ea31aab868e48c",
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
}

export default firebase;
