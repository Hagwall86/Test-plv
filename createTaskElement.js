import deleteTask from "./deleteTask.js";
import completeTask from "./completeTask.js";

// Skapa en listrad för varje uppgift
export default function createTaskElement(task, taskKey) {
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