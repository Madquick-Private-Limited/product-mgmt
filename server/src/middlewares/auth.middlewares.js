import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        throw new Error('Authentication required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
        throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};