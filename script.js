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

// Referenser till HTML-element
const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");

// Lägg till lyssnare för formulär-submit
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hämta värden från formuläret
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    // Skapa en ny uppgift i databasen
    const newTaskRef = db.ref("tasks").push();
    newTaskRef.set({
        title: title,
        description: description,
        date: date,
        completed: false,
    });

    // Återställ formuläret
    todoForm.reset();
});