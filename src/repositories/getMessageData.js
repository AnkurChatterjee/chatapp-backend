const db = require("../models");

const getMessageData = async (messageId) => {
  return db.Messages.findAll({
    attributes: ["groupid", "content", "userid", "createdon", "likes"],
    where: {
      id: messageId,
      enabled: 1,
    },
  });
};

module.exports = { getMessageData };
