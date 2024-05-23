import express from 'express';
import { test, updateUser,deleteUser,signout,getUsers  ,getUser,} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

//req=we sent to the API
//res=receive from the API
router.get('/test',test);
//for updating dta jo already added hain usko update krne ke loye 
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;