const jwt = require("jsonwebtoken");
const checkTokenSetUser = (req, res, next) => {
  const authHeader = req.get("authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      console.log("yes");
      jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
          console.log(error);
        }
        console.log("--->", user);
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = {
  checkTokenSetUser,
};