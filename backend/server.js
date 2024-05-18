import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/auth.routes.js';
import { connectToDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.routes.js';


dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const port = process.env.PORT || 3601;
const app = express();

app.use(express.json({ limit: "5mb" })) // make sure not allow to large or server will crash by denile of service attack.

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}))
app.use(express.urlencoded({ extended: true })) //to parse form data because they are urlencoded

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes)





app.listen(port, async () => {
    await connectToDB();
    console.log(`server is listening at port ${port}`)
})