"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'the*wefewjrekwjrwelqr$%$lsjsj';
function authenticate(req, res, next) {
    const token = req.cookies.token; // ✅ Read token from cookie
    console.log("token ", token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = Number(decoded.userId);
        req.emailId = decoded.emailId;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
