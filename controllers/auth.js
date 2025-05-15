const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/register');
  }
};

exports.login = passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/auth/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};