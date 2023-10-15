const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRETO;

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}
function comparePasswords (password, hash) {
  return bcrypt.compareSync(password, hash);
}
function hashPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
module.exports = { generateToken, verifyToken, hashPassword, comparePasswords };
