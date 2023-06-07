// Firebase-konfiguration (hämtad från ditt Firebase-projekt)
const firebaseConfig = {
    apiKey: "AIzaSyAsMCiUcLm97v6yrth166NxJi2PvBsDhUU",
    authDomain: "plv-projekt.firebaseapp.com",
    databaseURL: "https://plv-projekt-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "plv-projekt",
    storageBucket: "plv-projekt.appspot.com",
    messagingSenderId: "754434030320",
    appId: "1:754434030320:web:119fffabf4f782d030a035"
};

// Initialisera Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();