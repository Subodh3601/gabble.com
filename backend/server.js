import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { connectToDB } from './config/db.js';

dotenv.config()
const port = process.env.PORT || 3601;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/api/auth',authRoutes)








app.listen(port, async () => {
    await connectToDB();
    console.log(`server is listening at port ${port}`)
})