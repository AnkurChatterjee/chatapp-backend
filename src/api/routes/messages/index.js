const express = require("express");

const {
  sendNewMessage,
  addALike,
  getAllGroupMsgs,
  deleteMessageFromGroup,
} = require("./controllers");

const { authenticateJWT } = require("../../middlewares");

const router = express.Router();

router.post("/:groupId/send-message", authenticateJWT, sendNewMessage);

router.post("/:groupId/:messageId/add-like", authenticateJWT, addALike);

router.get("/:groupId/get-all-messages", authenticateJWT, getAllGroupMsgs);

router.patch(
  "/:groupId/:messageId/delete-message",
  authenticateJWT,
  deleteMessageFromGroup
);

module.exports = router;
