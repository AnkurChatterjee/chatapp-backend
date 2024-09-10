const db = require("../models");

const fetchGroupDetails = async (id) => {
  const dbData = await db.Groups.findAll({
    attributes: ["groupname", "createdby", "createdon"],
    where: {
      id,
      enabled: 1,
    },
    raw: true,
  });
  return dbData[0];
};

module.exports = { fetchGroupDetails };
