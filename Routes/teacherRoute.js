const express = require("express");
const controller = require("../controller/teacherController");
const {
  insertValidator,
} = require("./../middleware/validations/teacherValidator");
const {
  updateValidator
} = require("./../middleware/validations/teacherValidator");
const { validateId } = require("./../middleware/validations/teacherValidator");
const { isAdmin } = require("./../middleware/authenticationMW");
const { isTeacher } = require("./../middleware/authenticationMW");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/teachers")
  .get(isAdmin,controller.getAllTeacher)
  .post(
    insertValidator,
    validatonResult,
    // isAdmin,
    controller.insertTeacher
  )
  .patch(updateValidator,validatonResult,isAdmin, controller.updateTeacher);

router.route("/teachers/supervisors").get(controller.getAllSupervisors);
router.route("/teachers/:id").get( validateId, validatonResult,isAdmin,controller.getTeacherById).delete(isAdmin,controller.deleteTeacher);



module.exports = router;
