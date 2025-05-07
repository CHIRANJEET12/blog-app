import express, { Request, Response } from 'express';
import {authenticateToken} from '../middleware/user';
import {register,login,createProfile,getProfile} from '../controllers/user';
const router = express.Router();

router.post('/reg', register);
router.post('/login',login);
router.post('/profile',authenticateToken,createProfile);
router.get('/profile/:email',authenticateToken,getProfile);


export default router;