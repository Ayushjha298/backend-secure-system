const User = require('../models/User');
const sendEmail = require('../services/emailService');
const { generateToken } = require('../config/auth');
const logToFile = require('../utils/logger'); 

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            logToFile(`register failed: Email already exists - ${email}`);
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password, role });

        logToFile(`register success: User registered - ${email}`);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });

    } catch (error) {
        logToFile(`register ERROR: ${error.message}`);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser || !(await existingUser.matchPassword(password))) {
            logToFile(`login failed: Invalid email or password - ${email}`);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        logToFile(`login successfull: User logged in - ${email}`);

        res.json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            token: generateToken(existingUser),
        });

    } catch (error) {
        logToFile(`error in login: ${error.message}`);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log("HAH",email)
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            logToFile(`failed password reset request: Email not found - ${email}`);
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = generateToken(existingUser);
        existingUser.resetToken = resetToken;
        existingUser.resetTokenExpiry = Date.now() + 3600000;
        await existingUser.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(existingUser.email, 'Password Reset Request', `Click here to reset your password: ${resetLink}`);

        logToFile(`password reset request: Reset link sent - ${email}`);

        res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        logToFile(`password reset request error : ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const existingUser = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!existingUser) {
            logToFile(`password reset failed: Invalid or expired token`);
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        existingUser.password = newPassword;
        existingUser.resetToken = undefined;
        existingUser.resetTokenExpiry = undefined;
        await existingUser.save(); 
        
        logToFile(`password reset request: Password changed - ${existingUser.email}`);

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        logToFile(`password reset error: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logoutUser = (req, res) => {
    logToFile(`LOGOUT: User logged out`);
    res.json({ message: "User logged out" });
};

module.exports = { registerUser, loginUser, logoutUser, requestPasswordReset, resetPassword };
