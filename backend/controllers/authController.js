import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const saltRounds = 10;

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verificationCodes = {};

// Send verification code to email
export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Save code temporarily
  verificationCodes[email] = code;

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Verification code sent' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

// Verify the code and return token + user
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ verified: false, message: 'User not found' });
    }
    const token = generateToken(user._id);
    res.json({
      verified: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminCode: user.adminCode,
      },
    });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid code' });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, adminCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let role = 'user';
    let adminCodeToSave = undefined;
    if (adminCode && adminCode.trim() !== '') {
      role = 'admin';
      adminCodeToSave = adminCode;
    }

    const newUser = new User({ name, email, password: hashedPassword, role, adminCode: adminCodeToSave });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        adminCode: newUser.adminCode,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user (credentials only, not verification)
export const loginUser = async (req, res) => {
  const { email, password, adminCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If logging in as admin, check adminCode
    if (existingUser.role === 'admin' && adminCode) {
      if (existingUser.adminCode !== adminCode) {
        return res.status(401).json({ message: 'Invalid admin code' });
      }
    }

    const token = generateToken(existingUser._id);

    res.status(200).json({
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        adminCode: existingUser.adminCode,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};