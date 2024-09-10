const db = require("../models");

const getGroupIdFromNameAndCreator = async (groupName, creatorId) => {
  return db.Groups.findAll({
    attributes: ["id"],
    where: {
      groupname: groupName,
      createdby: creatorId,
      enabled: 1,
    },
    raw: true,
  });
};

module.exports = { getGroupIdFromNameAndCreator };
