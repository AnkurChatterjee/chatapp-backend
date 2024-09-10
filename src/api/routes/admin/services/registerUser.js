const moment = require("moment");
const db = require("../../../../models");
const bcrypt = require("bcrypt");
const { Logger } = require("../../../../lib/Logger");
const { insertNewUser } = require("../../../../repositories/insertNewUser");
const {
  getUserIdFromEmail,
} = require("../../../../repositories/getUserIdFromEmail");
const {
  updateUserDetails,
} = require("../../../../repositories/updateUserData");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, userRole } = req.body;
  const executorID = req.user.userId;
  if(!userName || !userEmail || !password || !userRole) {
    return res.status(400).send({
      status: 'Fail',
      message: 'Required fields missing in request body'
    });
  }
  try {
    //check if the email id already exists
    const userData = await getUserIdFromEmail(userEmail);
    //check if there is already an entry for the entered email id
    if (userData && userData.length > 0) {
      const { enabled } = (
        await db.sequelize.query(
          `Select enabled from g.users where email = '${userEmail}';`
        )
      )[0][0];
      //Check if user is already registered
      if (enabled === 1) {
        return res.status(400).send({
          status: "Fail",
          message: "Email id already exists for a different user",
        });
      } else {
        const updateObj = {};
        const hashedPassword = await bcrypt.hash(password, 10);
        updateObj.username = userName;
        updateObj.password = hashedPassword;
        updateObj.role = userRole;
        updateObj.enabled = 1;
        updateObj.modifiedon = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        updateObj.modifiedby = executorID;
        const updateResponse = await updateUserDetails(userData[0].id, updateObj);
        if (updateResponse && updateResponse.length === 0) {
          throw new Error("Error while enabling user");
        }
        return res.send({
          status: "Success",
          message: "User has been registered successfully",
        });
      }
    }

    //inserting new record for the user if required
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await insertNewUser(
      userName,
      userEmail,
      hashedPassword,
      userRole,
      executorID
    );
    if (!insertResult) {
      throw new Error("Error while inserting new user");
    }
    return res.send({
      status: "Success",
      message: "User has been registered successfully",
    });
  } catch (err) {
    Logger.error(err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { registerUser };
