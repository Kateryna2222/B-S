import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from "./routes/router.js";
import errorHandler from './middlewares/ErrorHandlingMiddleware.js'


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

app.use(errorHandler);

export default app;
