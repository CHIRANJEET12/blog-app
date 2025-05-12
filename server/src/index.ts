import  express  from "express";
import router from './routes/user';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); 


const app = express();
app.use(cors({
    origin: 'https://blog-app-1-7aa3.onrender.com',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
