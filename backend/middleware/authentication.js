const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  //token is going to be checked if valid or not,if valid then the next function will be executed,if not then it's not allowed for the user to get a response
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (result) {
        //if token in the auth section is valid;it's going to be saved in the request object so that it can be used later in other functions that require authentication
        req.token = result;
        next();
      } else {
        res.status(403).json({
          success: false,
          messgae: "The token is invalid or expired",
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

module.exports = {
  authentication,
};
