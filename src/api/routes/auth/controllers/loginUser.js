const { Logger } = require("../../../../lib/Logger");
const { authenticateUser } = require("../services");

const userLogin = async (req, res) => {
  try {
    await authenticateUser(req, res);
  } catch (err) {
    Logger.error("Error in user login ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { userLogin };
