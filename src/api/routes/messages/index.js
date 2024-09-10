const express = require("express");

const {
  sendNewMessage,
  addALike
} = require("./controllers");

const { authenticateJWT } = require("../../middlewares");

const router = express.Router();

router.post("/:groupId/send-message", authenticateJWT, sendNewMessage);

router.post("/:groupId/:messageId/add-like", authenticateJWT, addALike);

module.exports = router;
