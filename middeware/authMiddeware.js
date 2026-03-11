const { sendResponse } = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
   const token = req.headers.authorization?.startsWith("Bearer ")
   ?req.headers.authorization.split(" ")[1]
   :req.headers.authorization || req.headers.token;

    if (!token) {
      return res
        .status(401)
        .send(sendResponse(null, true, "Token missing"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .send(sendResponse(null, true, `Invalid token: ${err.message}`));
  }
};