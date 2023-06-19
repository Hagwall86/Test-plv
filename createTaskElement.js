import deleteTask from "./deleteTask.js";
import completeTask from "./completeTask.js";
import editTask from "./editTask.js";

// Skapa en listrad för varje uppgift
export default function createTaskElement(task, taskKey) {
    const taskItem = document.createElement("li");
    taskItem.id = taskKey;
    taskItem.className = "task-item";
    if (task.completed) {
        taskItem.classList.add("completed");
        taskItem.classList.remove("expired", "soonExpired");
    }
    taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p><strong>Due Date: ${task.date}</strong></p>
    <button class="complete-button">Complete</button>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>`;

    // Lägg till klass för att indikera om uppgiften är nära slutdatum
    const today = new Date();
    const dueDate = new Date(task.date);
    const soonDueDate = new Date(task.date);
    soonDueDate.setDate(dueDate.getDate() - 2);
    dueDate.setDate(dueDate.getDate() + 1);

    if (dueDate <= today) {
        taskItem.classList.add("expired");
    } else if (soonDueDate <= today && today < dueDate) {
        taskItem.classList.add("soonExpired");
        taskItem.innerHTML += `<span class="icon"></span>`;
    }

    // Lägg till uppgiften i listan
    todoList.appendChild(taskItem);

    // Lyssna på complete-knappen
    const completeButton = taskItem.querySelector(".complete-button");
    completeButton.addEventListener("click", () => {
        completeTask(taskKey);
    });

    // Lyssna på edit-knappen
    const editButton = taskItem.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
        editTask(taskKey);
    });

    // Lyssna på delete-knappen
    const deleteButton = taskItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTask(taskKey);
    });
}