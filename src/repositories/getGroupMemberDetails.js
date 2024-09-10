const db = require("../models");

const getGroupMemberDetails = async (groupId, memberId) => {
  return db.GroupMembers.findAll({
    attributes: ["id"],
    where: {
      groupid: groupId,
      userid: memberId,
      enabled: 1
    },
    raw: true,
  });
};

module.exports = { getGroupMemberDetails };
