const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    console.log('Authenticating user...');
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
      console.log('Access denied (no token)');
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      console.log('Access denied (invalid token)');
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    console.log('User authenticated');
    req.user = verified;
    next();
  } catch (error) {
    console.log('Authentication error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = authMiddleware;
