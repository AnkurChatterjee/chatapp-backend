const express = require("express");

const {
  createNewGroup,
  deleteGroup,
  addGroupMembers,
  removeUser,
  searchGroup,
  getAllGroupDetails,
} = require("./controllers");

const { authenticateJWT } = require("../../middlewares");

const router = express.Router();

router.post("/create-new-group", authenticateJWT, createNewGroup);

router.patch("/delete-group", authenticateJWT, deleteGroup);

router.post("/:groupId/add-group-members", authenticateJWT, addGroupMembers);

router.patch("/:groupId/remove-group-member", authenticateJWT, removeUser);

router.get("/search-group", authenticateJWT, searchGroup);

router.get("/get-all-groups", authenticateJWT, getAllGroupDetails);

module.exports = router;
