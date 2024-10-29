// utils/config.js
module.exports = {
  port: process.env.PORT || 5132,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
