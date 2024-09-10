const { Logger } = require("../../../../lib/Logger");
const { createGroup } = require("../services");

const createNewGroup = async (req, res) => {
  try {
    await createGroup(req, res);
  } catch (err) {
    Logger.error("Error while creating new group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { createNewGroup };
