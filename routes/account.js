const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

// Регистрация нового пользователя
router.post('/reg', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body.login, req.body.email);
    
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password
    });

    const user = await User.addUser(newUser);
    console.log('User successfully added:', user.login);
    
    res.json({
      success: true, 
      msg: "User has been registered!"
    });
    
  } catch (err) {
    console.log('Registration error:', err.message);
    
    res.json({
      success: false, 
      msg: err.message || "User could not be registered"
    });
  }
});

// Авторизация пользователя (вход)
router.post('/auth', async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    
    console.log('Login attempt:', login);

    const user = await User.getUserByLogin(login);
    
    if (!user) {
      console.log('User not found:', login);
      return res.json({
        success: false, 
        msg: "User not found"
      });
    }

    const isMatch = await User.comparePass(password, user.password);
    
    if (isMatch) {
      // Создаем JWT токен
      const token = jwt.sign(
        { id: user._id, login: user.login }, 
        config.secret, 
        { expiresIn: 3600 * 24 } // 24 hours
      );

      console.log('Login successful:', login);
      
      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          login: user.login,
          email: user.email
        }
      });
    } else {
      console.log('Invalid password for:', login);
      return res.json({
        success: false, 
        msg: "Incorrect password"
      });
    }
    
  } catch (err) {
    console.log('Auth error:', err);
    res.json({
      success: false, 
      msg: "Server error"
    });
  }
});

// Защищенный маршрут (требуется JWT токен)
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    success: true,
    msg: 'User Dashboard',
    user: req.user
  });
});

module.exports = router;