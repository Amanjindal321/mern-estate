import express from 'express';
import { signin, signup, checkUsername, google, signout } from '../contrrollers/auth.controller.js';


const router=express.Router();

router.post('/signup', signup)
router.get('/check-username', checkUsername); // correction
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', signout);

export default router;