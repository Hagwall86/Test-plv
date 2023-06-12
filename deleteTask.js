import db from './firebaseConfig.js';

// Ta bort uppgiften
export default function deleteTask(taskKey) {
    const taskRef = db.ref(`tasks/${taskKey}`);
    taskRef.remove((error) => {
        if (error) {
            console.log("Error deleting task:", error);
        }
    });
}
