import permanentlyDeleteUsers from "../services/permanentlyDeleteUsers.js";
import schedule from "node-schedule";

// Запуск щодня о 02:00 ранку
schedule.scheduleJob('0 2 * * *', async () => {
    try {
        await permanentlyDeleteUsers();
        console.log("Soft deleted users cleanup completed");
    } catch (err) {
        console.error("Error deleting users:", err);
    }
});