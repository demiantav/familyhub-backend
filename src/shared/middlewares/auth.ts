import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { env } from '../../core/config/env.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El "Bearer" es el [0]

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, env.JWT_SECRET);
    req.user = verified as { memberId: string; familyId: string; role: string }; // Aquí inyectamos el payload validado
    next();
  } catch (error: unknown) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
