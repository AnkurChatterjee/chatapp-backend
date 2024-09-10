const db = require("../models");

const deleteMsgFromDb = async (msgId) => {
  return db.Messages.update(
    { enabled: 0 },
    {
      where: {
        id: msgId,
        enabled: 1,
      },
    }
  );
};

module.exports = { deleteMsgFromDb };
