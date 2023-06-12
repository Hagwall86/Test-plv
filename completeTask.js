import db from './firebaseConfig.js';

// Markera uppgiften som slutförd
export default function completeTask(taskKey) {
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
