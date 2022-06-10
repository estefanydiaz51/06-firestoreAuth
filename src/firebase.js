import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA2fJA69V10aFbSmEHimDodzmmyiEz1TUU",
    authDomain: "firestore-auth-1-b759a.firebaseapp.com",
    projectId: "firestore-auth-1-b759a",
    storageBucket: "firestore-auth-1-b759a.appspot.com",
    messagingSenderId: "784539497842",
    appId: "1:784539497842:web:894148387eb8f89a51d9eb"
};

if( !firebase.apps.length ) {
    firebase.initializeApp( firebaseConfig );
}

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp();

firebase.getCurrentUser = () => {
    return new Promise( (resolve, reject) => {
        const unsuscribe = firebase.auth().onAuthStateChanged( user => {
            unsuscribe()
            resolve( user )
        }, reject)
    })
}

export {
    db,
    auth,
    marcaTiempo,
    firebase
}
