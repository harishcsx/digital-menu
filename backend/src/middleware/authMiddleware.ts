import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token; // ✅ Read token from cookie
  console.log("token ", token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; emailId: string };
    req.userId = Number(decoded.userId);
    req.emailId = decoded.emailId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}
