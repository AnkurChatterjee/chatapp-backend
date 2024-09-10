const { Logger } = require("../../../../lib/Logger");
const { deleteMessage } = require("../services");

const deleteMessageFromGroup = async (req, res) => {
  try {
    await deleteMessage(req, res);
  } catch (err) {
    Logger.error("Error while deleting message ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { deleteMessageFromGroup };
