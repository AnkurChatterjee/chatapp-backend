const { Logger } = require("../../../../lib/Logger");
const {
  fetchGroupDetails,
} = require("../../../../repositories/fetchGroupDetails");
const { deleteGroup } = require("../../../../repositories/deleteGroup");
const {
  deleteAllGroupMembers,
} = require("../../../../repositories/deleteAllGroupMembers");

const deleteOneGroup = async (req, res) => {
  const { groupId } = req.body;
  const { userId, role } = req.user;
  if (!groupId) {
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
    //a group can be deleted only by it's creator or an admin
    if (groupDetails.createdby !== userId && role !== "admin") {
      return res.status(401).send({
        status: "Fail",
        message: "You are not allowed to delete this group",
      });
    }
    //delete the group
    const deleteResponse = await deleteGroup(groupId);
    if (deleteResponse && deleteResponse.length === 0) {
      throw new Error("Error occurred while deleting group");
    }
    //we also have to remove the members from the deleted group
    const removeAllMembers = await deleteAllGroupMembers(groupId);
    if (removeAllMembers && removeAllMembers.length === 0) {
      throw new Error("Error occurred while removing group members");
    }
    return res.send({
      status: "Success",
      message: "Deleted group successfully",
    });
  } catch (err) {
    Logger.error("Error while deleting group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { deleteOneGroup };
