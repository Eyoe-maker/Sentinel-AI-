import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

export { clerkMiddleware, requireAuth };

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);
  if (auth?.userId) {
    (req as any).userId = auth.userId;
  }
  next();
}

export function getUserId(req: Request): string | null {
  const auth = getAuth(req);
  return auth?.userId || null;
}
