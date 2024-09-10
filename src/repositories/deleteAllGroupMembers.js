const db = require("../models");

const deleteAllGroupMembers = async (groupId) => {
  return db.GroupMembers.update(
    { enabled: 0 },
    {
      where: {
        groupid: groupId,
        enabled: 1,
      },
    }
  );
};

module.exports = { deleteAllGroupMembers };
