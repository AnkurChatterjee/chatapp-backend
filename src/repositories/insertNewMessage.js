const db = require("../models");

const insertMessageInDb = async (data) => {
  return db.Messages.create(data);
};

module.exports = { insertMessageInDb };
