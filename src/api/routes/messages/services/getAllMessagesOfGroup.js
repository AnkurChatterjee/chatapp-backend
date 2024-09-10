const db = require("../../../../models");
const { Logger } = require("../../../../lib/Logger");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const { checkForUserInGroup } = require("../../groups/services");

const fetchAllMessagesOfGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId, role } = req.user;
  if (!groupId) {
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

    //get all messages of the group
    const selectData = await db.sequelize.query(
      `Select m.id, m.userid, m.content, m.createdon, m.likes, u.username from g.messages m join g.users u on u.id = m.userid where m.groupid = '${groupId}' and m.enabled = '1';`
    );
    const dbData = selectData[0];
    if (!dbData || (dbData && dbData.length === 0)) {
      return res.send({
        status: "Fail",
        messages: "No messages found for this group",
      });
    }
    const msgData = [];
    dbData.forEach((msg) => {
      const obj = {};
      obj.id = msg.id;
      obj.sentBy = msg.username;
      obj.senderId = msg.userid;
      obj.message = msg.content;
      obj.sentAt = msg.createdon;
      obj.likes = msg.likes;
      msgData.push(obj);
    });
    return res.send({
      status: "Success",
      messages: msgData,
    });
  } catch (err) {
    Logger.error("Error while fetching all messages ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { fetchAllMessagesOfGroup };
