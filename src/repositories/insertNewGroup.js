const db = require("../models");

const insertNewGroup = async (
  name,
  executorID
) => {
  return db.Groups.create({
    groupname: name,
    createdby: executorID,
  });
};

module.exports = { insertNewGroup };
