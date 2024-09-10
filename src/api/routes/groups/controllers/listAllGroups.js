const { Logger } = require("../../../../lib/Logger");
const { listAllGroups } = require("../services");

const getAllGroupDetails = async (req, res) => {
  try {
    await listAllGroups(req, res);
  } catch (err) {
    Logger.error("Error while fetching all groups ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { getAllGroupDetails };
