import express, { Request, Response } from 'express';
import {authenticateToken} from '../middleware/user';
import {register,login} from '../controllers/user';
const router = express.Router();

router.post('/reg', register);
router.post('/login',authenticateToken,login);

export default router;