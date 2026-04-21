import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        memberId: string;
        familyId: string;
        role: string;
      };
    }
  }
}
