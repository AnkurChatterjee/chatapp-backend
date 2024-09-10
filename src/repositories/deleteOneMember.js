const db = require("../models");

const deleteOneMember = async (groupId, memberId) => {
  return db.GroupMembers.update(
    { enabled: 0 },
    {
      where: {
        groupid: groupId,
        userid: memberId,
        enabled: 1,
      },
    }
  );
};

module.exports = { deleteOneMember };
