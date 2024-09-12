const moment = require("moment");
const { Logger } = require("../../../../lib/Logger");
const { getUserDetails } = require("../../../../repositories/getUserLoginData");
const {
  updateUserDetails,
} = require("../../../../repositories/updateUserData");

const revokeUserAccess = async (req, res) => {
  const { userId } = req.body;
  const executorID = req.user.userId;
  if (!userId) {
    return res.status(400).send({
      status: "Fail",
      message: "Required fields missing in request body",
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
    const updateParams = {};
    updateParams.enabled = 0;
    updateParams.modifiedon = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    updateParams.modifiedby = executorID;
    const updateResponse = await updateUserDetails(userId, updateParams);
    if (updateResponse && updateResponse.length === 0) {
      throw new Error("Error while updating user details");
    }
    return res.send({
      status: "Success",
      message: "User access is revoked",
    });
  } catch (err) {
    Logger.error("Error while revoking user access ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { revokeUserAccess };
