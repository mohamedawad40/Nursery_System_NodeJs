const express = require("express");
const controller = require("../controller/childController");
const {
  insertValidator,
} = require("./../middleware/validations/childValidator");
const {
  updateValidator
} = require("./../middleware/validations/childValidator");
const { childIdvalidator } =require("./../middleware/validations/childValidator");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(
    (req, res, next) => {
      console.log(req.body);
      next();
    },
    insertValidator,
    validatonResult,
    controller.insertChild
  )
  .patch(updateValidator, validatonResult, controller.updateChild);

router.route("/child/:id").get(childIdvalidator,validatonResult,controller.getChildById).delete(controller.deleteChild);


module.exports = router;
