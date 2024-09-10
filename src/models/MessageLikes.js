const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const MessageLikes = sequelize.define(
    "MessageLikes",
    {
      messageid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdon: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      enabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
    },
    {
      tableName: "message_likes",
      timestamps: false,
    }
  );
  MessageLikes.removeAttribute('id');
  return MessageLikes;
};
