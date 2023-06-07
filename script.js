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

        // Skapa en listrad för varje uppgift
        const taskItem = document.createElement("li");
        taskItem.id = taskKey;
        taskItem.className = "task-item";
        taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due Date: ${task.date}</p>
        <button onclick="completeTask('${taskKey}')">Complete</button>
        <button onclick="deleteTask('${taskKey}')">Delete</button>`;

        // Lägg till klass för att indikera om uppgiften är nära slutdatum
        const today = new Date();
        const dueDate = new Date(task.date);
        if (dueDate <= today) {
            taskItem.classList.add("expired");
            taskItem.innerHTML += `<span class="icon"></span>`
        }

        // Lägg till uppgiften i listan
        todoList.appendChild(taskItem);
    });
});