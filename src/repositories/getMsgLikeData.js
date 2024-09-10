const db = require("../models");

const getMsgLikeData = async (messageId, userId) => {
  return db.MessageLikes.findAll({
    attributes: ["messageid"],
    where: {
      messageid: messageId,
      userid: userId,
      enabled: 1,
    },
  });
};

module.exports = { getMsgLikeData };
