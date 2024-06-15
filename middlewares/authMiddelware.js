const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }
    
    const tokenParts = authHeader.split(" ");
    
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send({
        success: false,
        message: "Authorization header format is 'Bearer <token>'",
      });
    }
    
    const token = tokenParts[1];
    
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};
