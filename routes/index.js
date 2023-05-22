const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send("API is greeaaat!");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
