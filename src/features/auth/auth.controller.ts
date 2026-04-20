import { Request, Response } from 'express';
import { AdminRegisterSchema, AdminLoginSchema } from './auth.schema.js';
import { authService } from './auth.service.js';

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const validateData = AdminRegisterSchema.parse(req.body);
    const result = await authService.registerAdmin(validateData);
    res.status(201).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validateData = AdminLoginSchema.parse(req.body);
    const result = await authService.loginAdmin(validateData);
    res.status(200).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};
