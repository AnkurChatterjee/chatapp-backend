const { Logger } = require("../../../../lib/Logger");
const { sendMessage } = require("../services");

const sendNewMessage = async (req, res) => {
  try {
    await sendMessage(req, res);
  } catch (err) {
    Logger.error("Error while sending new message ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { sendNewMessage };
