import  express  from "express";
import router from './routes/user';
import dotenv from 'dotenv';
dotenv.config(); 


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',router);

const PORT = process.env.PORT || 8000;
app.get('/',(req,res)=>{
    res.json("hello");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});