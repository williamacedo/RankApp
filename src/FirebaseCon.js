import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBFXHyPLfhxGXQ3pExR13RsBK4x1ViOHkQ",
    authDomain: "rankapp-13328.firebaseapp.com",
    databaseURL: "https://rankapp-13328.firebaseio.com",
    projectId: "rankapp-13328",
    storageBucket: "rankapp-13328.appspot.com",
    messagingSenderId: "929425918739"  
};

firebase.initializeApp(config);

export default firebase;