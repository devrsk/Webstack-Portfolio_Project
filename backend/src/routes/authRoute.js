const { Router } = require('express');
const { register, login, isVerify, getUsers, logout } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validationMiddleware } = require('../middlewares/validationsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

// login route
router.post('/login', loginValidation, validationMiddleware, (req, res) => {
  console.log('Processing login request...');
  login(req, res);
});

// register route
router.post('/register', registerValidation, validationMiddleware, (req, res) => {
  console.log('Processing registration request...');
  register(req, res);
});

// get users
router.get('/get-users', (req, res) => {
  console.log('Processing getUsers request...');
  getUsers(req, res);
});

// logout route
router.get('/logout', (req, res) => {
  console.log('Processing logout request...');
  logout(req, res);
});

// get route to test if verified
router.get('/is-verify', authMiddleware, (req, res) => {
  console.log('Processing isVerify request...');
  isVerify(req, res);
});

module.exports = router;
