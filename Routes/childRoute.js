/**
 * @swagger
 * paths:
 *   /child:
 *     get:
 *       tags:
 *         - Children
 *       summary: Get all children
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: List of all children
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Child'
 *         500:
 *           description: Internal server error
 *
 *     post:
 *       tags:
 *         - Children
 *       summary: Create a new child
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       responses:
 *         200:
 *           description: New child created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Child'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 *
 *   /child/{id}:
 *     get:
 *       tags:
 *         - Children
 *       summary: Get child by ID
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the child to retrieve
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Child found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Child'
 *         404:
 *           description: Child not found
 *         500:
 *           description: Internal server error
 *
 *     delete:
 *       tags:
 *         - Children
 *       summary: Delete child by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the child to delete
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Child deleted successfully
 *         404:
 *           description: Child not found
 *         500:
 *           description: Internal server error
 */


const express = require("express");
const controller = require("../controller/childController");
const {
  insertValidator,
} = require("./../middleware/validations/childValidator");
const {
  updateValidator
} = require("./../middleware/validations/childValidator");
const { childIdvalidator } =require("./../middleware/validations/childValidator");
const { isAdmin } = require("./../middleware/authenticationMW");
const { isTeacher } = require("./../middleware/authenticationMW");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/child")
  .get(isAdmin,controller.getAllChildren)
  .post(
    (req, res, next) => {
      console.log(req.body);
      next();
    },
    insertValidator,
    validatonResult,
    controller.insertChild
  )
  .patch(updateValidator, validatonResult,isAdmin, controller.updateChild);

router.route("/child/:id").get(childIdvalidator,validatonResult,isAdmin,controller.getChildById).delete(isAdmin,controller.deleteChild);


module.exports = router;
