const { Logger } = require("../../../../lib/Logger");
const { deleteMsgFromDb } = require("../../../../repositories/deleteMessage");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const { getMessageData } = require("../../../../repositories/getMessageData");
const {
  getMessageSenderId,
} = require("../../../../repositories/getMessageSenderId");
const { removeLikesFromDb } = require("../../../../repositories/removeLikes");

const verifySender = async (msgId, userId) => {
  const dbData = await getMessageSenderId(msgId);
  if (!dbData || (dbData && dbData.length === 0)) return false;
  return dbData[0].userid === userId ? true : false;
};

const deleteMessage = async (req, res) => {
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
    //a message can only be deleted by it's sender or admin
    const isUserSender = await verifySender(messageId, userId);
    if (!isUserSender && role !== "admin") {
      return res.status(401).send({
        status: "Fail",
        message: "You are not allowed to delete this message",
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
    //checking if message is already deleted by user
    const senderId = await getMessageSenderId(messageId);
    if (!senderId || (senderId && senderId.length === 0)) {
      return res.status(400).send({
        status: "Fail",
        message: "Message already deleted",
      });
    }
    //delete message
    const delResult = await deleteMsgFromDb(messageId);
    if (!delResult) {
      throw new Error("Error while deleting message");
    }
    //we also need to remove the likes for the deleted message
    const removeLikes = await removeLikesFromDb(messageId);
    if (!removeLikes) {
      throw new Error("Error while deleting likes");
    }
    return res.send({
      status: "Success",
      message: "Message deleted",
    });
  } catch (err) {
    Logger.error("Error while liking message ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { deleteMessage };
