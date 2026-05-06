import app from '../app.js';
import sequelize from './database.js';
import initSocket from './socket.js';
import http from 'http';
import { config } from 'dotenv';
config();

import '../models/models.js'

const PORT = process.env.PORT;

async function startServer() {
    try {

        await sequelize.authenticate();
        console.log("Database connected");

        const server = http.createServer(app);
        initSocket(server);

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection ERROR:", error);
    }
}

startServer();