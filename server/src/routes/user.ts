import express, { Request, Response } from 'express';
import {authenticateToken} from '../middleware/user';
import {register,login,updateProfile,getProfile} from '../controllers/user';
const router = express.Router();

router.post('/reg', register);
router.post('/login',login);
router.get('/profile', getProfile);
router.post('/profile', updateProfile);
export default router;