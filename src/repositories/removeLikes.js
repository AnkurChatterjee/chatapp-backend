const db = require("../models");

const removeLikesFromDb = async (msgId) => {
  return db.MessageLikes.update(
    { enabled: 0 },
    {
      where: {
        messageid: msgId,
        enabled: 1,
      },
    }
  );
};

module.exports = { removeLikesFromDb };
