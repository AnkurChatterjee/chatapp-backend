const { Logger } = require("../../../../lib/Logger");
const { fetchAllMessagesOfGroup } = require("../services");

const getAllGroupMsgs = async (req, res) => {
  try {
    await fetchAllMessagesOfGroup(req, res);
  } catch (err) {
    Logger.error("Error while getting group messages ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { getAllGroupMsgs };
