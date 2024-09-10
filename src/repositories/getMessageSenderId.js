const db = require("../models");

const getMessageSenderId = async (messageId) => {
  return db.Messages.findAll({
    attributes: ["userid"],
    where: {
      id: messageId,
      enabled: 1,
    },
    raw: true,
  });
};

module.exports = { getMessageSenderId };
