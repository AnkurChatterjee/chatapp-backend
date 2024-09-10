const { Logger } = require("../../../../lib/Logger");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const { getMessageData } = require("../../../../repositories/getMessageData");
const { getMsgLikeData } = require("../../../../repositories/getMsgLikeData");
const {
  insertInLikesTable,
} = require("../../../../repositories/insertInLikesTable");
const {
  addLikeToMessage,
} = require("../../../../repositories/updateMessageLikes");
const { checkForUserInGroup } = require("../../groups/services");

const likeMessage = async (req, res) => {
  const { groupId, messageId } = req.params;
  const { userId, role } = req.user;
  if (!groupId || !messageId) {
    return res.send({
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
    if (!isUserGroupMember && role !== "admin") {
      return res.status(401).send({
        status: "Fail",
        message: "You are not a member of this group",
      });
    }
    //checking if the message exists
    const messageData = await getMessageData(messageId);
    if (!messageData || (messageData && messageData.length === 0)) {
      return res.status(400).send({
        status: "Fail",
        message: "Invalid message id",
      });
    }
    //checking if message is already liked by user
    const msgLikeData = await getMsgLikeData(messageId, userId);
    if (msgLikeData && msgLikeData.length > 0) {
      return res.status(400).send({
        status: "Fail",
        message: "Message already liked",
      });
    }
    //adding the entry for like in likes table
    const likesTblData = await insertInLikesTable({
      messageid: messageId,
      userid: userId,
    });
    if (!likesTblData) {
      throw new Error("Error while inserting like");
    }
    //adding like to the message
    const addLike = await addLikeToMessage(messageId);
    if (!addLike) {
      throw new Error("Error while adding new like");
    }
    return res.send({
      status: "Success",
      message: "Like added",
    });
  } catch (err) {
    Logger.error("Error while liking message ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { likeMessage };
