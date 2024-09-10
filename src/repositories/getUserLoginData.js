const db = require("../models");

const getUserLoginDetails = async (emailId) => {
  const dbData = await db.Users.findAll({
    attributes: ["id", "password", "role"],
    where: {
      email: emailId,
      enabled: 1,
    },
    raw: true,
  });
  if (!dbData || (dbData && dbData.length === 0)) {
    return { status: false, message: "Email id does not exist" };
  }
  const hashedPassword = dbData[0].password;
  const userId = dbData[0].id;
  const userRole = dbData[0].role;
  return { status: true, hashedPassword, userId, userRole };
};

const getUserDetails = async (userId) => {
  const dbData = await db.Users.findAll({
    attributes: ["username", "role"],
    where: {
      id: userId,
      enabled: 1
    },
    raw: true,
  });
  if (!dbData || (dbData && dbData.length === 0)) {
    return { status: false, message: "UserId does not exist" };
  }
  return { status: true, data: dbData[0] };
};

module.exports = { getUserLoginDetails, getUserDetails };
