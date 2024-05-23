const jwt = require("jsonwebtoken");

exports.generateToken = (userId, username) => {
  const payload = { userId, username };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
