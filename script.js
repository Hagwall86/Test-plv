import db from './firebaseConfig.js';
import createTaskElement from './createTaskElement.js';

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

// Lyssna på förändringar i databasen
db.ref("tasks").on("value", (snapshot) => {
    todoList.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
        const task = childSnapshot.val();
        const taskKey = childSnapshot.key;
        createTaskElement(task, taskKey);
    });
});