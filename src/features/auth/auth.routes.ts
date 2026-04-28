import { Router } from 'express';
import { authMiddleware, isAdminMiddleware } from '../../shared/middlewares/auth.js';
import {
  registerAdmin,
  loginAdmin,
  registerMember,
  getFamilyMembers,
  loginMember,
} from './auth.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerAdmin);
authRouter.post('/login', loginAdmin);
authRouter.post('/member/register', authMiddleware, isAdminMiddleware, registerMember);
authRouter.post('/member/login', loginMember);
authRouter.get('/family/members/:accessCode', getFamilyMembers);

export default authRouter;
