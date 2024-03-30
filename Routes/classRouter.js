/**
 * @swagger
 * openapi: "3.0.0"
 * info:
 *   version: "1.0.0"
 *   title: Nursery System API
 *   description: API documentation for Nursery System
 * basePath: /api/v1
 * tags:
 *   - name: Teachers
 *     description: Operations related to teachers
 *   - name: Classes
 *     description: Operations related to classes
 *   - name: Children
 *     description: Operations related to children
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 * paths:
 *   /class:
 *     get:
 *       tags:
 *         - Classes
 *       summary: Get all classes
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: List of all classes
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Class'
 *         500:
 *           description: Internal server error
 *
 *     post:
 *       tags:
 *         - Classes
 *       summary: Create a new class
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
 *               $ref: '#/components/schemas/Class'
 *       responses:
 *         200:
 *           description: New class created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 *
 *   /class/{id}:
 *     get:
 *       tags:
 *         - Classes
 *       summary: Get class by ID
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the class to retrieve
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Class found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         404:
 *           description: Class not found
 *         500:
 *           description: Internal server error
 *     delete:
 *       tags:
 *         - Classes
 *       summary: Delete class by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the class to delete
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Class deleted successfully
 *         404:
 *           description: Class not found
 *         500:
 *           description: Internal server error
 *
 *   /class/child/{id}:
 *     get:
 *       tags:
 *         - Classes
 *       summary: Get class information for a child by child ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the child
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Class information found for the child
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         404:
 *           description: Class information not found for the child
 *         500:
 *           description: Internal server error
 *
 *   /class/teacher/{id}:
 *     get:
 *       tags:
 *         - Classes
 *       summary: Get class information for a teacher by teacher ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the teacher
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Class information found for the teacher
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         404:
 *           description: Class information not found for the teacher
 *         500:
 *           description: Internal server error
 *
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - supervisor
 *       properties:
 *         _id:
 *           type: number
 *           description: The ID of the class
 *         name:
 *           type: string
 *           description: The name of the class
 *         supervisor:
 *           type: string
 *           description: The ID of the supervisor teacher
 *         children:
 *           type: array
 *           description: The list of children IDs in the class
 *           items:
 *             type: number
 *           uniqueItems: true
 */


const express = require("express");
const controller = require("../controller/classController")
const {
  insertValidator,
  updateValidator,
  validateChildId,
  validateTeacherId,
  classIdValidator
} = require("./../middleware/validations/classValidator");
const { isAdmin } = require("./../middleware/authenticationMW");
const { isTeacher } = require("./../middleware/authenticationMW");
const validatonResult = require("../middleware/validations/validationResult");
const router = express.Router();

router
  .route("/class")
  .get(isAdmin,controller.getAllClasses)
  .post(
    insertValidator,
    validatonResult,
    isAdmin,
    controller.insertClass
  )
  .patch(updateValidator, validatonResult,isAdmin, controller.updateClass);
  

router.route("/class/:id").get( classIdValidator, validatonResult,isAdmin,controller.getClassById).delete(controller.deleteClass);
router.route("/class/child/:id").get( validateChildId, validatonResult,isAdmin, controller.getClassChildrenInfo);
router.route("/class/teacher/:id").get( validateTeacherId, validatonResult,isAdmin, controller.getClassTeacherInfo);



module.exports = router;
