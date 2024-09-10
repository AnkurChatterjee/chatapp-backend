const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    "Groups",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      groupname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdon: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      createdby: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
    },
    {
      tableName: "groups",
      timestamps: false
    }
  );
  return Groups;
};
