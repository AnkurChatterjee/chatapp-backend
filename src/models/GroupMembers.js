module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define(
    "GroupMembers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
      addedby: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "group_members",
      timestamps: false,
    }
  );
  return GroupMembers;
};
