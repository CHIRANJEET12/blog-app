import express, { Request, Response } from 'express';
import {authenticateToken} from '../middleware/user';
import {register,login,updateProfile,getProfile,addPost,getPost,likePost} from '../controllers/user';
const router = express.Router();

router.post('/reg', register);
router.post('/login',login);
router.get('/profile',authenticateToken, getProfile);
router.post('/profile',authenticateToken, updateProfile);
router.post('/addposts',authenticateToken,addPost);
router.get('/getpost',authenticateToken,getPost);
router.post('/likes/:id',authenticateToken,likePost);
export default router;