const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/tokenGenerator');

// method to get all the users in the database
exports.getUsers = async (req, res) => {
  try {
    console.log('Fetching all users...');
    const { rows } = await db.query(`SELECT 
      first_name, 
      last_name, 
      user_email, 
      phone_number, 
      address_city, 
      address_state,
      property_count,
      created_at,
      updated_at
      FROM users`);

    console.log('Users:', rows);

    return res.status(200).json({
      success: true,
      users: rows
    });
  } catch (error) {
    console.log('Error fetching users:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// register controller
exports.register = async (req, res) => {
  // destructure the req.body
  const {
    first_name,
    last_name,
    user_email,
    password,
    phone_number,
    address_city,
    address_state
  } = req.body;
  
  try {
    console.log('Processing registration...');
    // Bcrypt to hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    if (!bcryptPassword) {
      console.log('Error hashing password');
      return res.status(401).json({
        success: false,
        message: 'Error hashing password',
      });
    }

    // Insert the new user into the database
    const newUser = await db.query(
      `INSERT INTO users (
        first_name, 
        last_name, 
        user_email, 
        password, 
        created_at, 
        updated_at, 
        phone_number, 
        address_city, 
        address_state,
        property_count
      ) VALUES ($1, $2, $3, $4, NOW(), NOW(), $5, $6, $7, 0)
      RETURNING *`,
      [
        first_name,
        last_name,
        user_email,
        bcryptPassword,
        phone_number,
        address_city,
        address_state
      ]
    );

    console.log('New user:', newUser.rows[0]);

    // Generate JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.log('Registration error:', error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// login controller
exports.login = async (req, res) => {
  try {
    // Destructure the req.body
    const { user_email, password } = req.body;

    console.log('Processing login...');
    // Check if user exists
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

    if (user.rows.length === 0) {
      console.log('Invalid credentials');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      console.log('Invalid credentials');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });

    // For cookie-based authentication
    // return res.status(200).cookie('token', token, { httpOnly: true }).json({
    //     success: true,
    //     message: 'Logged in successfully',
    // })
  } catch (error) {
    console.log('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isVerify = async (req, res) => {
  try {
    console.log('Verifying token...');
    res.json(true);
  } catch (error) {
    console.log('Verification error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout controller for token-based authentication
exports.logout = async (req, res) => {
  try {
    console.log('Logging out...');
    res.clearCookie('token').json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log('Logout error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
