module.exports = {
  ...require("./createGroup"),
  ...require("./deleteGroup"),
  ...require('./addMembersToGroup'),
  ...require('./removeMemberFromGroup'),
  ...require('./searchGroupByName'),
  ...require('./listAllGroups')
};
