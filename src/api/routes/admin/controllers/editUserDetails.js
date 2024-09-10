const { Logger } = require("../../../../lib/Logger");
const { editUserData } = require("../services");

const editUserParams = async (req, res) => {
  try {
    await editUserData(req, res);
  } catch (err) {
    Logger.error("Error while editing user data ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { editUserParams };
