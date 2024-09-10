const db = require("../models");

const insertMembersToGroup = async (insertData) => {
  return db.GroupMembers.bulkCreate(insertData);
};

module.exports = { insertMembersToGroup };
