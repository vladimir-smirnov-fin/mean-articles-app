require('dotenv').config();

module.exports = {
  db: process.env.MONGODB_URI,
  secret: process.env.JWT_SECRET
}