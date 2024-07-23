const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.findUserById);

module.exports = router;
