const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
function verifyToken(token) {
      try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
      } catch (error) {
      // If the token is invalid or expired, an error will be thrown
      return null;
      }
}


function signToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Adjust the expiration time as needed
  return token;
}

// function extractTokenInfo(token) {
//       try {
//         const decoded = jwt.decode(token);
//         return decoded;
//       } catch (error) {
//         return null;
//       }
//  }

module.exports = {verifyToken ,signToken};
