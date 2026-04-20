import { Router } from 'express';
import { registerAdmin } from './auth.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerAdmin);

export default authRouter;
