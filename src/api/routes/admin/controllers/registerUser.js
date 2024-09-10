const { Logger } = require("../../../../lib/Logger");
const { registerUser } = require("../services");

const userRegistration = async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (err) {
    Logger.error("Error in user registration ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { userRegistration };
