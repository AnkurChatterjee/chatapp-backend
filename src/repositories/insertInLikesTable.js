const db = require("../models");

const insertInLikesTable = async (data) => {
  return db.MessageLikes.create(data);
};

module.exports = { insertInLikesTable };
