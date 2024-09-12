const { Logger } = require("../../../../lib/Logger");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const {
  getAllValidUsers,
} = require("../../../../repositories/getAllValidUsers");
const {
  getGroupMemberDetails,
} = require("../../../../repositories/getGroupMemberDetails");
const {
  insertMembersToGroup,
} = require("../../../../repositories/insertMembersToGroup");

const checkForUserInGroup = async (groupId, memberId) => {
  const dbData = await getGroupMemberDetails(groupId, memberId);
  if (dbData && dbData.length === 0) return false;
  else return true;
};

const addMembersToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userIdsToAdd } = req.body;
  const { userId, role } = req.user;
  if (!groupId) {
    return res.status(400).send({
      status: "Fail",
      message: "Group Id missing in request",
    });
  }
  if (!userIdsToAdd || userIdsToAdd.length === 0) {
    return res.status(400).send({
      status: "Fail",
      message: "Required fields missing in request body",
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

    //group members can be added by group creator, admin and other members of that group
    const isUserGroupMember = await checkForUserInGroup(groupId, userId);
    if (
      groupDetails.createdby !== userId &&
      role !== "admin" &&
      !isUserGroupMember
    ) {
      return res.status(401).send({
        status: "Fail",
        message: "You are not allowed to add members to this group",
      });
    }
    //add group members
    const validUsers = await getAllValidUsers();
    const validUserIds = [];
    validUsers.forEach((user) => {
      validUserIds.push(user.id);
    });
    const bulkData = [];
    for (let userid of userIdsToAdd) {
      if (!validUserIds.includes(userid)) {
        return res.status(400).send({
          status: "Fail",
          message: `${userid} is not a valid user`,
        });
      }
      //checking if user already exists as a member in the group
      const isUserGroupMember = await checkForUserInGroup(groupId, userid);
      if (isUserGroupMember) {
        continue;
      }
      const userObj = {};
      userObj.groupid = groupId;
      userObj.userid = userid;
      userObj.enabled = 1;
      userObj.addedby = userId;
      bulkData.push(userObj);
    }
    const insertResult = await insertMembersToGroup(bulkData);
    if (!insertResult) {
      throw new Error("Error while adding group members");
    }
    return res.send({
      status: "Success",
      message: "Members added successfully",
    });
  } catch (err) {
    Logger.error("Error while adding new members ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { addMembersToGroup, checkForUserInGroup };
