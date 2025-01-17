const express = require("express");
const { registerUser ,authUser} = require("../controlllers/userControllers");
const router = express.Router();


router.route("/signup").post(registerUser);

router.post("/login", authUser);

module.exports = router;