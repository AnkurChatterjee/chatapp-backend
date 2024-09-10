const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      createdon: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      modifiedon: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      createdby: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modifiedby: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false
    }
  );
  return Users;
};
