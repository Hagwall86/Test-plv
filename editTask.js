import db from './firebaseConfig.js';

export default function editTask(taskKey) {
    const taskRef = db.ref(`tasks/${taskKey}`);

    taskRef.once("value", (snapshot) => {
        const task = snapshot.val();

        // Skapa ett formulär för att redigera uppgiften
        const form = document.createElement("form");
        form.innerHTML = `
        <label for="title">Title:</label>
        <input type="text" id="title" value="${task.title}">
        <label for="description">Description:</label>
        <textarea id="description">${task.description}</textarea>
        <label for="date">Date:</label>
        <input type="date" id="date" value="${task.date}">
        <button type="submit">Save</button>
        `;

        // Lyssna på spara-knappen
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Hämta de nya värdena från formuläret
            const newTitle = form.querySelector("#title").value;
            const newDescription = form.querySelector("#description").value;
            const newDate = form.querySelector("#date").value;

            // Uppdatera uppgiften i Firebase-databasen
            taskRef.update({
                title: newTitle,
                description: newDescription,
                date: newDate,
            });

            // Ta bort formuläret efter att ändringarna har sparats
            form.remove();
        });

        // Lägg till formuläret i uppgiftselementet
        const taskItem = document.getElementById(taskKey);
        taskItem.appendChild(form);
    });
}

