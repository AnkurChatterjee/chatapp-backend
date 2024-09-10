const { Logger } = require("../../../../lib/Logger");
const {
  searchByGroupName,
} = require("../../../../repositories/searchByGroupName");

const searchGroupByName = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).send({
        status: "Fail",
        message: "Group name missing",
      });
    }
    const dbData = await searchByGroupName(name);
    if (!dbData || (dbData && dbData.length === 0)) {
      return res.status(404).send({
        status: "Fail",
        message: "No results",
      });
    }
    const groups = [];
    dbData.forEach((elem) => {
        const groupObj = {};
        groupObj.id = elem.id;
        groupObj.groupName = elem.groupname;
        groupObj.createdOn = elem.createdon;
        groupObj.createdBy = elem.createdby;
        groups.push(groupObj);
    })
    return res.send({
      status: "Success",
      groups
    });
  } catch (err) {
    Logger.error("Error while searching group ", err.message);
    return res.status(500).send({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = { searchGroupByName };
