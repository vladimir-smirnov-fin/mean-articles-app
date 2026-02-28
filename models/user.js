const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// СОЗДАЕМ МОДЕЛЬ
const User = mongoose.model('User', UserSchema);

// ЭКСПОРТИРУЕМ МОДЕЛЬ (это важно!)
module.exports = User;

// Добавляем методы к модели
module.exports.getUserByLogin = async function(login) {
  try {
    const query = {login: login};
    return await this.findOne(query);
  } catch (error) {
    throw error;
  }
};

module.exports.getUserById = async function(id) {
  try {
    return await this.findById(id);
  } catch (error) {
    throw error;
  }
};

module.exports.addUser = async function(newUser) {
  try {
    // Проверяем, есть ли пользователь с таким логином
    const existingByLogin = await this.findOne({ login: newUser.login });
    if (existingByLogin) {
      throw new Error('User with this login already exists');
    }
    
    // Проверяем, есть ли пользователь с таким email
    const existingByEmail = await this.findOne({ email: newUser.email });
    if (existingByEmail) {
      throw new Error('User with this email already exists');
    }
    
    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    
    // Сохраняем пользователя
    return await newUser.save();
    
  } catch (error) {
    throw error;
  }
};

module.exports.comparePass = async function(passFromUser, userDBPass) {
  try {
    return await bcrypt.compare(passFromUser, userDBPass);
  } catch (error) {
    throw error;
  }
};