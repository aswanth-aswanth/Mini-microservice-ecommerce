const jwt = require("jsonwebtoken");

exports.generateToken = (userId, username) => {
  const payload = { userId, username };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, "Secret", options);
  return token;
};
