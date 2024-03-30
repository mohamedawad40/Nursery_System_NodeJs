/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       tags:
 *         - Teachers
 *       summary: Login for teachers
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
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: JWT token for authentication
 *         401:
 *           description: Unauthorized access
 *         500:
 *           description: Internal server error
 *
 *   /teachers:
 *     get:
 *       tags:
 *         - Teachers
 *       summary: Get all teachers
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: token
 *           in: path
 *           description: Access token
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: List of all teachers
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   
 *         500:
 *           description: Internal server error
 *
 *     post:
 *       tags:
 *         - Teachers
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
 *             properties:
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *               role:
 *                 type: string  
 *       responses:
 *         200:
 *           description: New teacher created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 *
 *   /teachers/{id}:
 *     get:
 *       tags:
 *         - Teachers
 *       summary: Get teacher by ID
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the teacher to retrieve
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Teacher found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         404:
 *           description: Teacher not found
 *         500:
 *           description: Internal server error
 *     delete:
 *       tags:
 *         - Teachers
 *       summary: Delete teacher by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the teacher to delete
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Teacher deleted
 *         404:
 *           description: Teacher not found
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
    isAdmin,
    controller.insertTeacher
  )
  .patch(updateValidator,validatonResult,isAdmin, controller.updateTeacher);

router.route("/teachers/supervisors").get(isAdmin,controller.getAllSupervisors);
router.route("/teachers/:id").get( validateId, validatonResult,isAdmin,controller.getTeacherById).delete(isAdmin,controller.deleteTeacher);



module.exports = router;
