import  express  from "express";
import router from './routes/user';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); 


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({extended:true}));
app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});