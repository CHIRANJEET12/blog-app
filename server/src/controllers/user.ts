import { Request, Response } from 'express';
import { pool } from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey : string = process.env.JWT_SECRET || 'your_fallback_secret'; 

export const register = async (req: Request, res: Response): Promise<any> => {
    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    if (confirmPassword !== password) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
            [fullName, email, hashedPass]
        );
        const user = newUser.rows[0];
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Payload (you can add more info here)
            secretKey,
            { expiresIn: '1h' } // Token expiration time
        );

        // Send response with token

        res.status(201).json({ message: 'Registration successful', token, user });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, secretKey as string, { expiresIn: '5d' });


        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
