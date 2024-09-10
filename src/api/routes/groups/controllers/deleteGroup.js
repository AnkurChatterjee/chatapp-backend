const { Logger } = require("../../../../lib/Logger");
const { deleteOneGroup } = require("../services");

const deleteGroup = async (req, res) => {
  try {
    await deleteOneGroup(req, res);
  } catch (err) {
    Logger.error("Error while deleting group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { deleteGroup };
