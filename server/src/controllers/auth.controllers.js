import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = await User.create({ username, email, password, role });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
