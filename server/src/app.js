import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json({limit: '16kb'}));
app.use(cookieParser());
const CorsOption = {
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(CorsOption));
app.use(express.urlencoded({extended: true, limit: '16kb'}));


export {app};