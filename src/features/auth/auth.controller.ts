import { Request, Response } from 'express';
import { AdminRegisterSchema } from './auth.schema.js';
import { authService } from './auth.service.js';

const registerAdmin = async (req: Request, res: Response) => {
  try {
    const validateData = AdminRegisterSchema.parse(req.body);
    const result = await authService.registerAdmin(validateData);
    res.status(201).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export { registerAdmin };
