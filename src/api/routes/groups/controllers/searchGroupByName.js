const { Logger } = require("../../../../lib/Logger");
const { searchGroupByName } = require("../services");

const searchGroup = async (req, res) => {
  try {
    await searchGroupByName(req, res);
  } catch (err) {
    Logger.error("Error while searching group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { searchGroup };
