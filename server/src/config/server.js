import app from '../app.js';
import sequelize from './database.js';
import {config} from 'dotenv';
config();

const PORT = process.env.PORT;

async function startServer() {
    try {

        await sequelize.authenticate();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection ERROR:", error);
    }
}

startServer();