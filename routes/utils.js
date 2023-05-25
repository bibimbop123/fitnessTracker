const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are not authorized",
    });
  }
  next();
};
module.exports = { authRequired };
