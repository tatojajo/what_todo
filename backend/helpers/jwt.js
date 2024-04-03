const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_KEY;
  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/users/login", "/api/users/register"] });
}

module.exports = authJwt;
