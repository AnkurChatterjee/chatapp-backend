const { enabled } = require("../api");
const db = require("../models");

const updateUserDetails = async (userId, updatedValues) => {
  return db.Users.update(updatedValues, {
    where: {
      id: userId,
    },
  });
};

module.exports = { updateUserDetails };
