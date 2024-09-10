const { Logger } = require("../../../../lib/Logger");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const {
  insertMessageInDb,
} = require("../../../../repositories/insertNewMessage");
const { checkForUserInGroup } = require("../../groups/services");

const sendMessage = async (req, res) => {
  const { groupId } = req.params;
  const { message } = req.body;
  const { userId, role } = req.user;
  if (!groupId || !message) {
    return res.status(400).send({
      status: "Fail",
      message: "Missing required fields in request",
    });
  }
  try {
    const groupDetails = await fetchGroupDetails(groupId);
    //checking if the group exists or not
    if (!groupDetails) {
      return res.status(404).send({
        status: "Fail",
        message: "Group not found",
      });
    }
    //checking if the user is a member of the group or if user is an admin
    const isUserGroupMember = await checkForUserInGroup(groupId, userId);
    if (!isUserGroupMember && role !== 'admin') {
      return res.status(401).send({
        status: "Fail",
        message: "You are not a member of this group",
      });
    }
    //insert the message into database
    const insertMessage = await insertMessageInDb({
      groupid: groupId,
      userid: userId,
      content: message,
      likes: 0,
    });
    if (!insertMessage) {
      throw new Error("Error while inserting new message");
    }
    return res.send({
      status: "Success",
      message: "Message sent",
    });
  } catch (err) {
    Logger.error("Error while sending message ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { sendMessage };
