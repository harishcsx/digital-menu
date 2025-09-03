import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET;

export async function signup(req: Request, res: Response) {
  try {
    // const { username, password, email } = req.body;
    const { username, password } = req.body;

    const isExist = await prisma.user.findUnique({ where: { username } });

    if (isExist) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      // data: { username, password: hashed, email }
      // git change 
      data: { username, password: hashed,  email: 'harish@gmail.com'}
    });

    console.log("User saved!", user);

    res.status(201).json({ message: 'User created', userId: user.userId });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  console.log("login : ", user);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  console.log("correct password", valid)

  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.userId, emailId: user.email }, JWT_SECRET, { expiresIn: '7d' });

  // Set JWT in HTTP-only cookie
 res.cookie('token', token, {
  httpOnly: true,
  secure: true,           // always true for cross-site cookies
  sameSite: 'none',       // allow cross-site cookie
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});


  console.log("token given")
  res.json({ message: 'Login successful' });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
}


export async function protectedRoute(req: Request, res: Response) {
  res.json({ message: `Hello User ${req.userId}! This is protected data.` });
}


export async function isAuthenticate(req: Request, res: Response) {
  console.log("access granted");
  return res.json({
    msg: 'authenticated'
  })

}
