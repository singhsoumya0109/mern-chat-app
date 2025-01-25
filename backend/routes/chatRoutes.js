const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  exitFromGroup,
} = require("../controlllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);//to create a chat with a specific user
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupexit").post(protect, exitFromGroup);

module.exports = router;