const express = require("express");
const controller = require("./../controller/authenticationController");
const router = express.Router();
const  handleChangePassword  = require("../controller/changeController")


router.post("/login", controller.login);
router.route("/changepassword").put(handleChangePassword);

module.exports = router;
