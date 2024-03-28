const { body,param } = require("express-validator");

exports.insertValidator = [
 
  body("_id")
    .isInt()
    .withMessage("Class ID should be an integer"),

  body("name")
    .isString()
    .withMessage("Name should be a string"),

  body("supervisor")
    .isInt()
    .withMessage("Supervisor ID should be an integer"),

  body("children")
    .isArray()
    .withMessage("Children should be an array"),

  body("children.*")
    .isInt()
    .withMessage("Each child ID should be an integer")
];

exports.updateValidator = [
 
  body("_id")
    .isInt()
    .withMessage("Class ID should be an integer"),

  body("name").optional()
    .isString()
    .withMessage("Name should be a string"),

  body("supervisor").optional()
    .isMongoId()
    .withMessage("Supervisor ID should be an integer"),

  body("children").optional()
    .isArray()
    .withMessage("Children should be an array"),

  body("children.*").optional()
    .isInt()
    .withMessage("Each child ID should be an integer")
];


exports.validateTeacherId = [
  param("id")
      .isMongoId()
      .withMessage("teacher id should be Monjo Id"),
];
exports.validateChildId = [
  param("id")
      .isInt()
      .withMessage("child id should be integer"),
];
exports.classIdValidator = [
  param("id")
      .isInt()
      .withMessage("Class ID should be an integer"),
];


// {
//   "_id": 1,
//   "name": "Classroom A",
//   "supervisor": 123, 
//   "children": [1, 2, 3] 
// }