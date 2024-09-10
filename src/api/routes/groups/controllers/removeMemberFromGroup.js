const { Logger } = require("../../../../lib/Logger");
const { removeMemberFromGroup } = require("../services");

const removeUser = async (req, res) => {
  try {
    await removeMemberFromGroup(req, res);
  } catch (err) {
    Logger.error("Error while removing group member ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { removeUser };
