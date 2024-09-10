const db = require("../models");

const fetchAllGroupsFromDb = async () => {
  return db.Groups.findAll({ where: { enabled: 1 }, raw: true });
};

module.exports = { fetchAllGroupsFromDb };
