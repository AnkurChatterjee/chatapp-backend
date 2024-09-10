const db = require("../models");

const addLikeToMessage = async (id) => {
  return db.Messages.increment("likes", {
    by: 1,
    where: {
      id,
      enabled: 1,
    },
  });
};

module.exports = { addLikeToMessage };
