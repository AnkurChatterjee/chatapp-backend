const { Op } = require("sequelize");
const db = require("../models");

const searchByGroupName = async (searchVaue) => {
  return await db.Groups.findAll({
    attributes: ["id", "groupname", "createdon", "createdby"],
    where: {
      groupname: {
        [Op.like]: `%${searchVaue}%`,
      },
      enabled: 1,
    },
    raw: true,
  });
};

module.exports = { searchByGroupName };
