import { Router } from 'express';
import { registerAdmin, loginAdmin } from './auth.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerAdmin);
authRouter.post('/login', loginAdmin);

export default authRouter;
