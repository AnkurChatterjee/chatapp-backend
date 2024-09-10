const db = require("../models");

const deleteGroup = async (id) => {
  return db.Groups.update(
    { enabled: 0 },
    {
      where: {
        id,
        enabled: 1,
      },
    }
  );
};

module.exports = { deleteGroup };
