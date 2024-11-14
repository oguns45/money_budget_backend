import express, { Request, Response } from 'express';
import User from '../models/User';  // Import the User model to interact with the database
import bcrypt from 'bcrypt';  // For hashing user passwords securely
import jwt from 'jsonwebtoken';  // For creating a secure token for the user session
import { UserInterface } from '../utils/Interfaces';  // Import custom TypeScript interfaces (like User)

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email, budget } = req.body;  // Expect username, password, email, and budget in the request body

        console.log(username);  // Log the username to the console (for debugging)

        // Step 1: Hash the user's password for security
        const salt = await bcrypt.genSalt(10);  // Generate a salt to make the password more secure
        const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password using the salt

        // Step 2: Create a new user object, including a budget field
        const user = new User({
            username, 
            email, 
            password: hashedPassword, 
            budget: budget || {}  // Budget can be an object or an empty object if not provided
        });

        // Step 3: Save the user to the database
        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid user data' });  // Return an error if user data is invalid
        }

        // Save the user data into the database
        await user.save();

        // Respond with the created user's data (excluding password)
        res.status(201).json({ error: false, data: user });

    } catch (error: any) {
        // Return error if something goes wrong
        return res.status(500).json({ error: true, message: 'Internal server error: ' + error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;  // Extract email and password from the request body

        // Step 1: Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please provide both email and password to login' });
        }

        // Step 2: Check if the user exists in the database using their email
        const user: UserInterface | null = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }

        // Step 3: Compare the provided password with the hashed password stored in the database
        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }

        // Step 4: Create a JWT token to authenticate the user
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, budget: user.budget }, // Include the user's budget in the token for easy access
            process.env.JWT_SECRET as string,  // Secret key to sign the JWT token
            { expiresIn: process.env.JWT_EXPIRES_IN }  // Set token expiration time
        );

        // Step 5: Respond with the user data and the token
        res.status(200).json({ error: false, data: { user, token } });

    } catch (error: any) {
        // Return error if something goes wrong
        return res.status(500).json({ error: true, message: 'Internal server error: ' + error.message });
    }
};
