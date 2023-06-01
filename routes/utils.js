const jwt = require("jsonwebtoken");

//this is where we verify token
const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("req.user", req.user);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are not authorized",
    });
    return;
  }
  next();
};
module.exports = { authRequired };
