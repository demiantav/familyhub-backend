import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth.js';
import { registerAdmin, loginAdmin, registerMember } from './auth.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerAdmin);
authRouter.post('/login', loginAdmin);
authRouter.post('/member/register', authMiddleware, registerMember);

export default authRouter;
