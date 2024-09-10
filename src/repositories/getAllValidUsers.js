const db = require("../models");

const getAllValidUsers = async () => {
  return db.Users.findAll({
    attributes: ["id"],
    where: {
      enabled: 1,
    },
  });
};

module.exports = { getAllValidUsers };
