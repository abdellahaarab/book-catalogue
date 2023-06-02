const userMiddleware = require('../Middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.registerForm = (req, res) => {
  res.render('forms/register');
}

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.render('error',{ 'message':'Username is already taken' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.render('done',{ 'message':'User registered successfully' });
  } catch (error) {
    res.render('error',{ 'message':'Error registering user' });
  }
};


exports.loginForm = (req, res) => {
  res.render('forms/login');
}

exports.loginUser = async (req, res, next) => {
  // try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.render('error',{ 'message':'User not found' });
    }

    // const isPasswordValid = await user.comparePassword(password);
    if (user.password !== password) {
      res.render('error',{ 'message':'Invalid password' });
    }
    // req.user = user;
    // userMiddleware(req, res, next);
    // res.render('new');
    
    // res.render('done',{ 'message':'User logged in successfully' });
    
  // } catch (error) {
  //   res.render('error',{ 'message':'Error logging in' });
  // }
};


exports.logoutUser = (req, res) => {
  res.render('done',{ 'message':'User logged out successfully' });
};
