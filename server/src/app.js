import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from "./routes/router.js";

import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import path from 'path';

import errorHandler from './middlewares/ErrorHandlingMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(fileUpload({}))
app.use('/users', express.static(path.resolve(__dirname, 'static/users')));
app.use('/products', express.static(path.resolve(__dirname, 'static/products')));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true 
}));

app.use('/api', router);

app.use(errorHandler);

export default app;
