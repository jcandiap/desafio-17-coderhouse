import express from 'express';

import { validateLogin, validateRegister } from '../middleware/userMiddleware.js';
import { login, logout, register } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/register', validateRegister, register);
userRouter.post('/login', validateLogin, login);
userRouter.get('/logout', logout);

export default userRouter;