import config from './config.js';

const apiKey = config.apiKey;
const databaseUrl = config.databaseUrl;
const authDomain = config.authDomain;
const projectId = config.projectId;
const storageBucket = config.storageBucket;
const messagingSenderId = config.messagingSenderId;
const appId = config.appId;

// Firebase-konfiguration (hämtad från ditt Firebase-projekt)
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseUrl,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
};

// Initialisera Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db;