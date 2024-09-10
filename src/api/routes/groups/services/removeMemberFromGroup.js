const { Logger } = require("../../../../lib/Logger");
const { deleteOneMember } = require("../../../../repositories/deleteOneMember");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const { checkForUserInGroup } = require("./addMembersToGroup");

const removeMemberFromGroup = async (req, res) => {
  const { groupId } = req.params;
  const { memberId } = req.body;
  const { userId, role } = req.user;
  if (!groupId) {
    return res.status(400).send({
      status: "Fail",
      message: "Group Id missing in request",
    });
  }
  if (!memberId) {
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
    //group members can be removed only by it's creator or admin
    if (groupDetails.createdby !== userId && role !== "admin") {
      return res.status(401).send({
        status: "Fail",
        message: "You are not allowed to remove users from this group",
      });
    }
    //check if the user is a member of the group
    const isUserGroupMember = await checkForUserInGroup(groupId, memberId);
    if (!isUserGroupMember) {
      return res.status(400).send({
        status: "Fail",
        message: "This user is not a member of the given group",
      });
    }
    //remove group member
    const removeMember = await deleteOneMember(groupId, memberId);
    if (removeMember && removeMember.length === 0) {
      throw new Error("Error occurred while removing user from the group");
    }
    return res.send({
      status: "Success",
      message: "Removed user from group successfully",
    });
  } catch (err) {
    Logger.error("Error while removing group member ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { removeMemberFromGroup };
