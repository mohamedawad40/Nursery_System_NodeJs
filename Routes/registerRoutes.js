/**
 * @swagger
 * /register:
 *    post:
 *       tags:
 *         - Register
 *       summary: Create a new teacher
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullname:
 *                   type: string
 *                   description: The full name of the teacher
 *                 password:
 *                   type: string
 *                   description: The password of the teacher
 *                 email:
 *                   type: string
 *                   description: The email of the teacher 
 *                 image:
 *                   type: string
 *                   description: The image of the teacher 
 *                 role:
 *                   type: string
 *                   description: The role of the teacher
 *       responses:
 *         200:
 *           description: New teacher created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: JWT token for authentication
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 */


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
