const moment = require('moment');
const bcrypt = require("bcrypt");
const { Logger } = require("../../../../lib/Logger");
const { getUserDetails } = require("../../../../repositories/getUserLoginData");
const { fieldsAllowedToEdit } = require("../../../../config");
const {
  updateUserDetails,
} = require("../../../../repositories/updateUserData");
const {
  getUserIdFromEmail,
} = require("../../../../repositories/getUserIdFromEmail");

const editUserData = async (req, res) => {
  const { userId, parametersToChange } = req.body;
  const executorID = req.user.userId;
  if(!userId || !parametersToChange) {
    return res.status(400).send({
      status: 'Fail',
      message: 'Required fields missing in request body'
    });
  }
  try {
    const checkUser = await getUserDetails(userId);
    if (!checkUser.status) {
      return res.status(400).send({
        status: "Fail",
        message: "Invalid userId",
      });
    }
    let updatedParams = {};
    for (let param of parametersToChange) {
      if (!fieldsAllowedToEdit.includes(param.key)) {
        return res.status(400).send({
          status: "Fail",
          message: `field ${param.key} cannot be edited`,
        });
      }
      if (param.key === "email") {
        const emailId = param.value;
        const userData = await getUserIdFromEmail(emailId);
        if (userData && userData.length > 0) {
          return res.status(400).send({
            status: "Fail",
            message: "Email id already exists for a different user",
          });
        }
      }
      if (param.key === "password") {
        const hashedPassword = await bcrypt.hash(param.value, 10);
        updatedParams.password = hashedPassword;
      } else {
        updatedParams[param.key] = param.value;
      }
    }
    updatedParams.modifiedon = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    updatedParams.modifiedby = executorID;
    const updateResponse = await updateUserDetails(userId, updatedParams);
    if (updateResponse && updateResponse.length === 0) {
      throw new Error("Error while updating user details");
    }
    return res.send({
      status: "Success",
      message: "Updated user details successfully",
    });
  } catch (err) {
    Logger.error("Error while updating user details ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { editUserData };
