const { error } = require("winston");
const { Logger } = require("../../../lib/Logger");
const { jwtVerify } = require("./services");

//Middleware to authenticate users
const authenticateJWT = (req, res, next) => {
  let jwtDetails;
  const tokenBearer =
    req.headers.authorization && req.headers.authorization.split("=")[0];
  if (!tokenBearer || tokenBearer !== "chatapp-token") {
    return res
      .status(401)
      .send({ status: "Fail", message: "Inavlid authorization bearer" });
  }
  const token =
    req.headers.authorization && req.headers.authorization.split("=")[1];
  if (!token) {
    return res
      .status(401)
      .send({ status: "Fail", message: "Authentication token not found" });
  }
  try {
    jwtDetails = jwtVerify(token);
    if ((jwtDetails && !jwtDetails.status) || !jwtDetails) {
      return res
        .status(403)
        .send({ status: "Fail", message: "Unauthorized access" });
    }
    req.user = jwtDetails.data;
    return next();
  } catch (err) {
    Logger.error("Error in authenticateJWT middleware ", err.message);
    return res
      .status(403)
      .send({ status: "Fail", message: "Invalid or expired token" });
  }
};

//Middleware to verify if the user is admin
const authenticateAdmin = (req, res, next) => {
  authenticateJWT(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).send({
        status: "Fail",
        message: "You are not allowed to perform this action",
      });
    }
    return next();
  });
};

module.exports = { authenticateJWT, authenticateAdmin };
