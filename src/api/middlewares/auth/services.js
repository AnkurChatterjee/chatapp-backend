const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

//create jwt
const jwtSign = (data, duration) => {
  return jwt.sign(data, jwtSecretKey, {
    issuer: process.env.JWT_ISSUER || "ChatApp",
    subject: process.env.JWT_SUBJECT || "help@chatapp.com",
    audience: `http://${process.env.HOST}`,
    expiresIn: duration,
  });
};

//verify jwt
const jwtVerify = (token) => {
  try {
    const result = jwt.verify(token, jwtSecretKey, {
      issuer: process.env.JWT_ISSUER || "ChatApp",
      subject: process.env.JWT_SUBJECT || "help@chatapp.com",
      audience: `http://${process.env.HOST}`,
    });
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

module.exports = {
    jwtSign,
    jwtVerify
}
