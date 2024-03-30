const express = require("express");
const controller = require("../controller/teacherController");
const {
  insertValidator,
} = require("./../middleware/validations/teacherValidator");
const {
  updateValidator
} = require("./../middleware/validations/teacherValidator");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();



router
  .route("/register")
  .post(
    insertValidator,
    validatonResult,
    controller.insertTeacher
  );


  
module.exports = router;
