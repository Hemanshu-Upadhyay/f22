const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Unauthorized request,Token Not Provided" });
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed, Provided Token is Expired" });
  }
};

module.exports = auth;
