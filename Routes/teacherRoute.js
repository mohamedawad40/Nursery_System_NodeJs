const express = require("express");
const controller = require("../controller/teacherController");
const {
  insertValidator,
} = require("./../middleware/validations/teacherValidator");
const {
  updateValidator
} = require("./../middleware/validations/teacherValidator");
const { validateId } = require("./../middleware/validations/teacherValidator");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/teachers")
  .get(controller.getAllTeacher)
  .post(
    insertValidator,
    validatonResult,
    controller.insertTeacher
  )
  .patch(updateValidator,validatonResult, controller.updateTeacher)
  .delete(controller.deleteTeacher);

router.route("/teachers/:id").get( validateId, validatonResult,controller.getTeacherById);

router.route("/teachers/supervisors").get(controller.getAllSupervisors);

module.exports = router;
