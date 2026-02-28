const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
require('dotenv').config();

const app = express();
// Берем порт из окружения или используем 3000 для локальной разработки
const PORT = process.env.PORT || 3000;

// 1. CORS - разрешаем запросы с Angular
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mean-articles-app-vladimir-smirnov.onrender.com'  // Замените на ваш реальный URL после деплоя
    : 'http://localhost:4200',
  credentials: true
};
app.use(cors(corsOptions));

// 2. BodyParser - для обработки JSON данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. СЕССИЯ - ОБЯЗАТЕЛЬНО для Passport
app.use(session({
  secret: config.secret,
  resave: false,                    // Не сохранять сессию, если не изменялась
  saveUninitialized: false,         // Не создавать сессию автоматически
  cookie: { 
    secure: process.env.NODE_ENV === 'production',                   
    maxAge: 24 * 60 * 60 * 1000  
  }
}));

// 4. Passport - ДОЛЖЕН быть ПОСЛЕ сессии
app.use(passport.initialize());
app.use(passport.session());

// 5. Подключаем конфигурацию Passport
require('./config/passport')(passport);

// 6. Статические файлы
app.use(express.static(path.join(__dirname, 'public/browser')));

// 7. Подключение к MongoDB
mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
  console.log("Successfully connected to database");
});

mongoose.connection.on('error', (err) => {
  console.log("Database connection error: " + err);
});

// 8. Маршруты
app.get('/', (req, res) => {
  res.send('Home page');
});

app.use('/account', account);

// Подключаем маршруты для статей
const posts = require('./routes/posts');
app.use('/posts', posts);

// Важно: этот обработчик должен быть ПОСЛЕ всех API-маршрутов!
// Он перенаправляет все неизвестные запросы на Angular-приложение
app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/browser/index.html'));
});

// 9. Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});