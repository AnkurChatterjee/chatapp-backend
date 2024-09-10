const { Logger } = require("../../../../lib/Logger");
const {
  fetchAllGroupsFromDb,
} = require("../../../../repositories/fetchAllGroupsFromDb");

const listAllGroups = async (req, res) => {
  try {
    const groupsData = await fetchAllGroupsFromDb();
    if (!groupsData || (groupsData && groupsData.length === 0)) {
      return res.status(404).send({
        status: "Fail",
        message: "No groups found",
      });
    }
    const groups = [];
    groupsData.forEach((elem) => {
      const groupObj = {};
      groupObj.id = elem.id;
      groupObj.groupName = elem.groupname;
      groupObj.createdOn = elem.createdon;
      groupObj.createdBy = elem.createdby;
      groups.push(groupObj);
    });
    return res.send({
      status: "Success",
      groups,
    });
  } catch (err) {
    Logger.error("Error while listing groups ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { listAllGroups };
