const db = require("../models");

const getUserIdFromEmail = async (emailId) => {
  const dbData = await db.Users.findAll({
    attributes: ["id"],
    where: {
      email: emailId,
    },
    raw: true,
  });
  return dbData;
};

module.exports = { getUserIdFromEmail };
