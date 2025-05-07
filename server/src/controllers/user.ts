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
            { userId: user.id, email: user.email },
            secretKey,
            { expiresIn: '1h' } 
        );


        res.status(201).json({ message: 'Registration successful', token, name: user.fullname });

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
        console.log('Generated login token:', token);



        return res.status(200).json({ message: 'Login successful', token ,email: user.email});
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error. Please try again.' });
    }
};


export const getProfile = async (req: Request, res: Response): Promise<any> => {
    const email = req.query.email as string; // fetch email from query

    const result = await pool.query(
        'SELECT * FROM profiles WHERE email = $1',
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    const { 
        email, name, age, bio, location, website, twitter, github, linkedin, 
        facebook, instagram, portfolio, resume 
    } = req.body;

    const result = await pool.query(
        'INSERT INTO profiles (email, name, age, bio, location, website, twitter, github, linkedin, facebook, instagram, portfolio, resume) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ' +
        'ON CONFLICT (email) DO UPDATE ' +
        'SET name = $2, age = $3, bio = $4, location = $5, website = $6, twitter = $7, github = $8, linkedin = $9, facebook = $10, instagram = $11, portfolio = $12, resume = $13 ' +
        'RETURNING *',
        [email, name, age, bio, location, website, twitter, github, linkedin, facebook, instagram, portfolio, resume]
    );

    res.json(result.rows[0]);
};