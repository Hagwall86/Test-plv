import deleteTask from "./deleteTask.js";
import completeTask from "./completeTask.js";

// Skapa en listrad för varje uppgift
export default function createTaskElement(task, taskKey) {
    const taskItem = document.createElement("li");
    taskItem.id = taskKey;
    taskItem.className = "task-item";
    if (task.completed) {
        console.log('hit');
        taskItem.classList.add("completed");
        taskItem.classList.remove("expired", "soonExpired");
    }
    taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.date}</p>
    <button class="complete-button">Complete</button>
    <button class="delete-button">Delete</button>`;

    // Lägg till klass för att indikera om uppgiften är nära slutdatum
    const today = new Date();
    const soonDueDate = new Date(task.date);
    soonDueDate.setDate(soonDueDate.getDate() - 1);

    const dueDate = new Date(task.date);
    dueDate.setDate(dueDate.getDate() + 1);

    if (dueDate <= today) {
        taskItem.classList.add("expired");
        taskItem.innerHTML += `<span class="icon"></span>`;
    } else if (soonDueDate == today) {
        taskItem.classList.add("soonExpired");
        taskItem.innerHTML += `<span class="icon2"></span>`;
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