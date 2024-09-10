const { Logger } = require("../../../../lib/Logger");
const { addMembersToGroup } = require("../services");

const addGroupMembers = async (req, res) => {
  try {
    await addMembersToGroup(req, res);
  } catch (err) {
    Logger.error("Error while adding new members ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { addGroupMembers };
