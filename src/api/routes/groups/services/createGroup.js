const { Logger } = require("../../../../lib/Logger");
const {
  getGroupIdFromNameAndCreator,
} = require("../../../../repositories/getGroupIdFromNameAndCreator");
const {
  insertMembersToGroup,
} = require("../../../../repositories/insertMembersToGroup");
const { insertNewGroup } = require("../../../../repositories/insertNewGroup");

const createGroup = async (req, res) => {
  const { groupName } = req.body;
  const executorID = req.user.userId;
  if (!groupName) {
    return res.status(400).send({
      status: "Fail",
      message: "Required fields missing in request body",
    });
  }
  try {
    const insertResult = await insertNewGroup(groupName, executorID);
    if (!insertResult) {
      throw new Error("Error while inserting new user");
    }
    const groupId = await getGroupIdFromNameAndCreator(groupName, executorID);
    const addCreatorAsGroupMember = await insertMembersToGroup([
      {
        groupid: groupId[0].id,
        userid: executorID,
        enabled: 1,
        addedby: executorID,
      },
    ]);
    if (!addCreatorAsGroupMember) {
      throw new Error("Error while adding group creator as group member");
    }
    return res.send({
      status: "Success",
      message: "Group created successfully",
    });
  } catch (err) {
    Logger.error("Error while creating new group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { createGroup };
