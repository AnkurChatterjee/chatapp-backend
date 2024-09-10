const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      groupid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdon: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      likes: {
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
      tableName: "messages",
      timestamps: false
    }
  );
  return Messages;
};
