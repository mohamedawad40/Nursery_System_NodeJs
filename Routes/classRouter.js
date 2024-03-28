const express = require("express");
const controller = require("../controller/classController");
const {
  insertValidator,
  updateValidator,
  validateChildId,
  validateTeacherId,
  classIdValidator
} = require("./../middleware/validations/classValidator");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(
    insertValidator,
    validatonResult,
    controller.insertClass
  )
  .patch(updateValidator, validatonResult, controller.updateClass);
  

router.route("/class/:id").get( classIdValidator, validatonResult,controller.getClassById).delete(controller.deleteClass);
router.route("/class/child/:id").get( validateChildId, validatonResult, controller.getClassChildrenInfo);
router.route("/class/teacher/:id").get( validateTeacherId, validatonResult, controller.getClassTeacherInfo);



module.exports = router;
