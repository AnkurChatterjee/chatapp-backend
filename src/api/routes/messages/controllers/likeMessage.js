const { Logger } = require("../../../../lib/Logger");
const { likeMessage } = require("../services");

const addALike = async (req, res) => {
  try {
    await likeMessage(req, res);
  } catch (err) {
    Logger.error("Error while adding a like ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { addALike };
