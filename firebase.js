import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCRsr51Zg-bvJumOFVdiZKW_BlFhwFxW9Q",
    authDomain: "docs-30f5d.firebaseapp.com",
    projectId: "docs-30f5d",
    storageBucket: "docs-30f5d.appspot.com",
    messagingSenderId: "251289541980",
    appId: "1:251289541980:web:28721a00c1709b1f7f7599"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
export {db};