const express = require("express");

const { userRegistration, editUserParams, revokeUser } = require("./controllers");

const { authenticateJWT, authenticateAdmin } = require("../../middlewares");

const router = express.Router();

router.post(
  "/add-user-to-role",
  authenticateJWT,
  authenticateAdmin,
  userRegistration
);

router.patch(
  "/edit-user-details",
  authenticateJWT,
  authenticateAdmin,
  editUserParams
)

router.patch(
  "/revoke-user-access",
  authenticateJWT,
  authenticateAdmin,
  revokeUser
)

module.exports = router;
