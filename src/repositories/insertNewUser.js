const db = require("../models");

const insertNewUser = async (
  userName,
  userEmail,
  hashedPassword,
  userRole,
  executorID
) => {
  return db.Users.create({
    username: userName,
    email: userEmail,
    password: hashedPassword,
    role: userRole,
    createdby: executorID,
    modifiedby: executorID,
  });
};

module.exports = { insertNewUser };
