const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Attach decoded token payload to the request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// User registration route
router.post('/register', async (req, res) => {
  const { username, admissionNumber, password, cpassword } = req.body;

  if (!cpassword || password !== cpassword) {
    return res
      .status(400)
      .json({ error: 'Passwords do not match or Confirm Password is missing' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { admissionNumber }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or Admission Number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      admissionNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile using token (available to all authenticated users)
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Extract userId from token

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully',
      user,
    });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile by ID (available to all authenticated users)
router.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Extract userId from token
  const { username, admissionNumber, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if username is unique (if being updated)
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
      user.username = username;
    }

    if (admissionNumber) user.admissionNumber = admissionNumber;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (admin-only route)
router.get('/all', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  try {
    const users = await User.find().select('-password'); // Exclude password field
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user by ID (admin-only route)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  const jwtToken = authorizationHeader.split(' ')[1];

  try {
    const verifiedPayload = jwt.verify(jwtToken, 'your_jwt_secret');
    req.authenticatedUser = verifiedPayload; // Attach decoded payload to request
    next();
  } catch (verificationError) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// Get all users (admin-only route)
router.get('/fetch-all-users', verifyToken, async (req, res) => {
  if (req.authenticatedUser.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }

  try {
    const allUsers = await User.find().select('-password'); // Exclude password field
    res.status(200).json({ message: 'User list retrieved successfully.', allUsers });
  } catch (fetchError) {
    console.error('Error fetching user list:', fetchError.message);
    res.status(500).json({ error: 'Internal server error while fetching users.' });
  }
});

// Delete user by ID (admin-only route)
router.delete('/remove-user/:userId', verifyToken, async (req, res) => {
  if (req.authenticatedUser.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }

  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found with the given ID.' });
    }

    res.status(200).json({ message: 'User successfully deleted.', deletedUser });
  } catch (deletionError) {
    console.error('Error deleting user:', deletionError.message);
    res.status(500).json({ error: 'Internal server error while deleting user.' });
  }
});


module.exports = router;
