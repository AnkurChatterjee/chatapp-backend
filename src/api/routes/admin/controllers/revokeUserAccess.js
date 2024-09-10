const { Logger } = require("../../../../lib/Logger");
const { revokeUserAccess } = require("../services");

const revokeUser = async (req, res) => {
  try {
    await revokeUserAccess(req, res);
  } catch (err) {
    Logger.error("Error while revoking user access ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { revokeUser };
