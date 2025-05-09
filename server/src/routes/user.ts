import express, { Request, Response } from 'express';
import {authenticateToken} from '../middleware/user';
import {register,login,updateProfile,getProfile,addPost,getPost,likePost,editPost,delete1,getPostById} from '../controllers/user';
const router = express.Router();

router.post('/reg', register);
router.post('/login',login);
router.get('/profile',authenticateToken, getProfile);
router.post('/profile',authenticateToken, updateProfile);
router.post('/addposts',authenticateToken,addPost);
router.get('/getpost',authenticateToken,getPost);
router.post('/likes/:id',authenticateToken,likePost);
router.put('/edit/:id',authenticateToken,editPost);
router.delete('/delete/:id',authenticateToken,delete1);
router.get('/post/:id',getPostById);
// router.get('/profile/:id',getProfilebyId);



export default router;