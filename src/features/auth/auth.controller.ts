import { Request, Response } from 'express';
import {
  AdminRegisterSchema,
  AdminLoginSchema,
  MemberRegisterSchema,
  GetFamilyMembersSchema,
  MemberLoginSchema,
} from './auth.schema.js';
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

export const registerMember = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.user!; // Aseguramos que req.user no es undefined
    const validateData = MemberRegisterSchema.parse(req.body);
    const result = await authService.registerMember(validateData, familyId);
    res.status(201).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getFamilyMembers = async (req: Request, res: Response) => {
  try {
    const { accessCode } = GetFamilyMembersSchema.parse(req.params);
    const result = await authService.getMembers({ accessCode });
    res.status(200).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginMember = async (req: Request, res: Response) => {
  try {
    const validateData = MemberLoginSchema.parse(req.body);
    const result = await authService.loginMember(validateData);
    res.status(200).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};
