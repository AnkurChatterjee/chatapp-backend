const bcrypt = require("bcrypt");
const {
  getUserLoginDetails,
  getUserDetails,
} = require("../../../../repositories/getUserLoginData");
const { jwtSign } = require("../../../middlewares/auth/services");
const { Logger } = require("../../../../lib/Logger");

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAuthData = await getUserLoginDetails(email);
    if (!userAuthData.status) {
      Logger.info("Invalid email address");
      return res.status(400).send({
        status: "Fail",
        message: userAuthData.message,
      });
    }
    //Compare password with hashed password
    isPasswordValid = await bcrypt.compare(
      password,
      userAuthData.hashedPassword || ""
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        status: "Fail",
        message: "Invalid Password",
      });
    }

    //Generate JWT token
    const token = jwtSign(
      { userId: userAuthData.userId, role: userAuthData.userRole },
      "5d"
    );
    const userDetails = await getUserDetails(userAuthData.userId);
    if (!userDetails.status) {
      throw new Error(userDetails.message);
    }
    return res.send({
      status: 'Success',
      ...userDetails.data,
      accessToken: token,
    });
  } catch (err) {
    Logger.error("Error while authenticating user ", err.message);
    return res.send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { authenticateUser };
