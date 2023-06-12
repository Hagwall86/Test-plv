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

// Referenser till HTML-element
const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");

// Markera uppgiften som slutförd
function completeTask(taskKey) {
    const taskRef = db.ref(`tasks/${taskKey}`);
    taskRef.update({ completed: true }, (error) => {
        if (error) {
            console.log("Error completing task:", error);
        } else {
            // Uppdatera gränssnittet efter att uppgiften har markerats som slutförd
            const completedTask = document.getElementById(taskKey);
            completedTask.classList.remove("expired");
            completedTask.classList.add("completed");
        }
    });
}

// Ta bort uppgiften
function deleteTask(taskKey) {
    const taskRef = db.ref(`tasks/${taskKey}`);
    taskRef.remove((error) => {
        if (error) {
            console.log("Error deleting task:", error);
        }
    });
}

// Skapa en listrad för varje uppgift
function createTaskElement(task, taskKey) {
    const taskItem = document.createElement("li");
    taskItem.id = taskKey;
    taskItem.className = "task-item";
    if (task.completed) {
        taskItem.classList.add("completed");
    }
    taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.date}</p>
    <button class="complete-button">Complete</button>
    <button class="delete-button">Delete</button>`;

    // Lägg till klass för att indikera om uppgiften är nära slutdatum
    const today = new Date();
    const dueDate = new Date(task.date);
    if (dueDate <= today) {
        taskItem.classList.add("expired");
        taskItem.innerHTML += `<span class="icon"></span>`;
    }

    // Lägg till uppgiften i listan
    todoList.appendChild(taskItem);

    // Lyssna på complete-knappen
    const completeButton = taskItem.querySelector(".complete-button");
    completeButton.addEventListener("click", () => {
        completeTask(taskKey);
    });

    // Lyssna på delete-knappen
    const deleteButton = taskItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTask(taskKey);
    });
}

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

