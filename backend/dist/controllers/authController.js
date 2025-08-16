"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.protectedRoute = protectedRoute;
exports.isAuthenticate = isAuthenticate;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET || 'the*wefewjrekwjrwelqr$%$lsjsj';
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { username, password, email } = req.body;
            const { username, password } = req.body;
            const isExist = yield db_1.prisma.user.findUnique({ where: { username } });
            if (isExist) {
                return res.status(409).json({ msg: "User already exists" });
            }
            const hashed = yield bcrypt_1.default.hash(password, 10);
            const user = yield db_1.prisma.user.create({
                // data: { username, password: hashed, email }
                data: { username, password: hashed, email: 'harish@gmail.com' }
            });
            console.log("User saved!", user);
            res.status(201).json({ message: 'User created', userId: user.userId });
        }
        catch (err) {
            console.error('Signup error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield db_1.prisma.user.findUnique({ where: { username } });
        console.log("login : ", user);
        if (!user)
            return res.status(401).json({ error: 'Invalid credentials' });
        const valid = yield bcrypt_1.default.compare(password, user.password);
        console.log("correct password", valid);
        if (!valid)
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user.userId, emailId: user.email }, JWT_SECRET, { expiresIn: '7d' });
        // Set JWT in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log("token given");
        res.json({ message: 'Login successful' });
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    });
}
function protectedRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({ message: `Hello User ${req.userId}! This is protected data.` });
    });
}
function isAuthenticate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("access granted");
        return res.json({
            msg: 'authenticated'
        });
    });
}
